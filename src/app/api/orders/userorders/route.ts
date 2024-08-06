import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/Firebase/Initialisation';
import { decryptData } from '@/app/Utils/Encryption';
import { getUserOrders } from '@/Firebase/CRUD/Oders';
import { getUserRole } from '@/Firebase/Utils'; // Adjust the import path

export async function GET(req: NextRequest) {
    const  id  = req.nextUrl.searchParams.get('id'); // Get query parameter
    if(id ){
        
        try {
            
            const data = await getUserOrders(null,10,id);
            const orders = data.orders;
            const lastVisible = data.lastVisible;

            const decryptedOrders = orders.map(order => ({
                ...order,
                products: order.products.map((product: { id: any; quantity: any; }) => ({
                    id: decryptData(product.id),
                    quantity: product.quantity
                }))
            }));
            console.log(decryptedOrders)

            return NextResponse.json({ data: decryptedOrders, lastVisible }, { status: 200 });

        } catch (error) {
            return NextResponse.json({ error: error }, { status: 500 });
        }}
    else{ 
        return NextResponse.json({ error: 'no ID Error' }, { status: 500 });}
}
