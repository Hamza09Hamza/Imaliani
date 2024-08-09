// ./app/api/checkout_sessions/route.ts

import { encryptData } from '@/app/Utils/Encryption';
import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  try {
    const { products , userID ,userInfo} = await req.json();
    const encryptedProductData = products.map((product: { id: string; quantity: number }) => ({
      id: product.id,
      quantity: product.quantity
    }));
    const customCustomerId = encryptData(`${userInfo.email}-${userID}`);

    const lineItems = products.map((product: { name: string; description: string; images: string[]; amount: number; quantity: number }) => ({
      price_data: {
        currency: 'aed',
        
        

        product_data: {
          
          name: product.name,
          description: product.description,
          images:product.images
         
        },
        unit_amount: product.amount,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:3000/me/orders`,
      cancel_url: `http://localhost:3000/me/chart`,
      metadata: {
        encryptedProductData:JSON.stringify(encryptedProductData),
        encryptedUserId: userID,
        encryptedUserInfo:JSON.stringify(userInfo),
        customCustomerId: customCustomerId, 
      },
    });


    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: { Allow: 'POST' } });
}
