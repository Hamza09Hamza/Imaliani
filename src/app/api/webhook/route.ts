import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { decryptData,encryptData } from '@/app/Utils/Encryption';
import {getCurrentFirestoreTimestamp} from "@/app/Utils/time"
import {setNewOrder} from "@/Firebase/CRUD/Oders"
import { updateUserField } from '@/Firebase/CRUD/User';
import { adminCreateOrder, adminUpdateUserChart } from "@/Firebase/admintest";
import { Timestamp } from 'firebase-admin/firestore';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.WEBHOOK_SECRET_KEY!;

export async function POST(req: Request, res: NextResponse) {
  let event: Stripe.Event ;

  try {
    const rawBody = await req.text(); 
    const signature = headers().get('Stripe-Signature') as string;
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error('⚠️  Webhook signature verification failed.', error);
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }

  if (!event) {
    return NextResponse.json({ error: 'Event not defined' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSessionCompleted(session);
      break;
   
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string);
  const totalAmount = paymentIntent.amount;
  // await initAdmin()
  
  const encryptedProductData = session.metadata?.encryptedProductData || "[]";
  const encryptedUserInfo = session.metadata?.encryptedUserInfo || "[]";
  const userId = session.metadata?.encryptedUserId || "";
  
  const productData = JSON.parse(encryptedProductData) as { id: string; quantity: number }[]
  const UserInfo=JSON.parse(encryptedUserInfo) as any

    const order={
        ShippingAdresse:{
          streetAddress:UserInfo.streetAddress,
          zipCode:UserInfo.zipCode,
          city:UserInfo.city,
          state:UserInfo.state,
        },
        email:encryptData(UserInfo.email),
        products:productData,
        Status:{
            Pre_order:Timestamp.now(),
            Processing:null,
            In_transit:null,
            Shipped:null,
            Cancelled:null,
        },
        UserID:userId,
        totalAmount:totalAmount/100,
    }
    const encryptedOrderData = {
      ...order,
      UserID: order.UserID,
      encryptedUserID:encryptData(order.UserID),
      products: order.products.map(product => ({
          ...product,
          id: encryptData(product.id)
      }))
    };  

    
    try {
      await adminCreateOrder(encryptedOrderData)
      console.log("done setting order")

      await adminUpdateUserChart(userId)
      console.log("done deleting  chart")

    } catch (error) {
        console.log("something went off")
    } 

}

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: { Allow: 'POST' } });
}
