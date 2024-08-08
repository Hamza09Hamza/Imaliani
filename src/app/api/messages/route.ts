import { NextResponse, NextRequest } from 'next/server';
import { decryptData } from '../../../app/Utils/Encryption';
import { getAllOrders } from '../../../Firebase/CRUD/Oders';
import { getUserRole } from '../../../Firebase/Utils'; // Adjust the import path
import { collection, getDocs } from 'firebase/firestore';
import { DB } from '../../../Firebase/Initialisation';

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
            const reference=collection(DB,"Messages")
            const data = await getDocs(reference);
            if(!data.empty){

                const orders = data.docs.map((doc)=>({...doc.data(),id:doc.id}));
                return NextResponse.json({ data: orders }, { status: 200 });
            }

            


        } catch (error) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }

