import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/Firebase/Initialisation';
import { decryptData } from '@/app/Utils/Encryption';
import { getAllOrders } from '@/Firebase/CRUD/Oders';
import { getUserRole } from '@/Firebase/Utils'; // Adjust the import path

export async function GET(req: NextRequest) {
        const  id  = req.nextUrl.searchParams.get('id'); // Get query parameter
        try {
            if (!id) {
                return NextResponse.json({ error: 'User not authorized' }, { status: 401 });
            }
            
            const userRole = await getUserRole(id);
            if (userRole !== 'admin') {
                return NextResponse.json({ error: 'Access Forbidden' }, { status: 403 });
            }

            const data = await getAllOrders(null,10);
            const orders = data.orders;
            const lastVisible = data.lastVisible;

            const decryptedOrders = orders.map(order => ({
                ...order,
                products: order.products.map((product: { id: any; quantity: any; }) => ({
                    id: decryptData(product.id),
                    quantity: product.quantity
                }))
            }));

            return NextResponse.json({ data: decryptedOrders, lastVisible }, { status: 200 });

        } catch (error) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }

