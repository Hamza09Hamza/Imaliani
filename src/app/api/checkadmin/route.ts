import { NextResponse, NextRequest } from 'next/server';
import { decryptData, encryptData } from '../../../app/Utils/Encryption';
import { getAllOrders } from '../../../Firebase/CRUD/Oders';
import { getUserRole } from '../../../Firebase/Utils'; // Adjust the import path
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { DB } from '../../../Firebase/Initialisation';

export async function GET(req: NextRequest) {
        const id  = req.nextUrl.searchParams.get('id'); // Get query parameter
        try {
            let ID=decryptData(id)
            if (!ID) {
                return NextResponse.json({ error: 'User not authorized' }, { status: 401 });
            }
            
            const userRole = await getUserRole(ID);
            if (userRole !== 'admin') {
                return NextResponse.json({ error: 'Access Forbidden' }, { status: 403 });
            }else{

               const data= (await getDoc(doc(DB,"admins/",ID))).data()

                   return NextResponse.json({ result: true }, { status: 200 });
            } 
        }
         catch (error) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }

