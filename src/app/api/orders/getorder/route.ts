import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from '@/Firebase/Initialisation';
import { decryptData } from '@/app/Utils/Encryption';
import { getUserOrders } from '@/Firebase/CRUD/Oders';
import { getUserRole } from '@/Firebase/Utils'; // Adjust the import path
import { doc, getDoc } from 'firebase/firestore';

export async function GET(req: NextRequest) {
    const  id  = req.nextUrl.searchParams.get('id'); 
    if(id ){
        
        try {
            const data = await getDoc(doc(DB,"Orders/",id));
            if(data.exists())
                {
                    let order = data.data();
                    
                    order = {
                        ...order,
                        email:decryptData(order.email),
                        orderId:data.id,
                        products: order.products.map((product: { id: any; quantity: any; }) => ({
                            id: decryptData(product.id),
                            quantity: product.quantity
                        }))
                    }

                return NextResponse.json({ data: order }, { status: 200 });
        }
        } catch (error) {
            return NextResponse.json({ error: error }, { status: 500 });
        }}
    else{ 
        return NextResponse.json({ error: 'no ID Error' }, { status: 500 });
    }
}
