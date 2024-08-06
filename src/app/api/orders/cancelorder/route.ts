import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from '@/Firebase/Initialisation';
import { decryptData } from '@/app/Utils/Encryption';
import { deleteOrder, getAllOrders } from '@/Firebase/CRUD/Oders';
import { getUserRole } from '@/Firebase/Utils'; // Adjust the import path
import { doc, getDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    
    try {
        const user = auth.currentUser;
        if (!user) {
            return NextResponse.json({ error: 'User not authorized' }, { status: 401 });
        }
        
        const userRole = await getUserRole(user.uid);

        if (userRole !== 'admin') {
            return NextResponse.json({ error: 'Access Forbidden' }, { status: 403 });
        }
        
        const data = await getDoc(doc(DB,"Orders/"+id))
        if(data.exists()){
            let order=data.data()
            order ={
                ...order,
                encryptedUserID:decryptData(order.encryptedUserID),
                products: order.products.map((product: { id: any; quantity: any; }) => ({
                        id: decryptData(product.id),
                        quantity: product.quantity
                    }))
            }
            if(user.uid==order.encryptedUserID)
                deleteOrder(id)
            else
                NextResponse.json({ error: 'Access Forbidden' }, { status: 403 });
        }else{
            NextResponse.json({ error: 'Not Found ' }, { status: 404 });
        }

        

        return NextResponse.json({ response:"cancelled sucessfully !"  }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
