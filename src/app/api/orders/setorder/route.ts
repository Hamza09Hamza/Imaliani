import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from '@/Firebase/Initialisation';
import { decryptData } from '@/app/Utils/Encryption';
import {  updateOrderStatus,getUserOrders } from '@/Firebase/CRUD/Oders';
import { getUserRole } from '@/Firebase/Utils'; // Adjust the import path
import { doc, getDoc } from 'firebase/firestore';

export async function PUT(req: NextRequest) {
    const { id,status,userId } = await req.json();
    const referer = req.headers.get('referer');
    if (!referer || !referer.includes('/admin/orders')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const userRole = await getUserRole(userId);
            if (userRole !== 'admin') {
                return NextResponse.json({ error: 'Access Forbidden' }, { status: 403 });
            }
    try {
        const data = await getDoc(doc(DB,"Orders/",id));

        if( data.exists())
        {
            await updateOrderStatus(id,status);
        }
        else{
            NextResponse.json({ error: 'Order does not  exists' }, { status: 404 })
        }


        return NextResponse.json({ status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
