import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from '../../../../Firebase/Initialisation';
import { decryptData } from '../../../../app/Utils/Encryption';
import { collection, getDocs,  query,  where } from 'firebase/firestore';
import { getUserRole } from '../../../../Firebase/Utils'; // Adjust the import path

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
        
        const ordersRef = collection(DB, "Customized Gifts");
       
        const data = await getDocs(ordersRef)
        if( !data.empty)
        {
            let result=data.docs.map(doc=>(
                {...doc.data(),
                    id:doc.id,
                    UserID:decryptData(doc.data().UserID) 
                }));
            return NextResponse.json({result},{status:200} );

        }
        else{
            NextResponse.json({ error: 'no Customized Gifts  exists' }, { status: 404 })
        }


    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }


}
