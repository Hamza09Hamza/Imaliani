import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from '../../../../Firebase/Initialisation';
import { decryptData, encryptData } from '../../../../app/Utils/Encryption';
import {  updateUserField } from '../../../../Firebase/CRUD/User';
import { collection, getDocs,  query,  where } from 'firebase/firestore';

export async function GET(req: NextRequest) {
    const  id  = req.nextUrl.searchParams.get('id'); // Get query parameter
    if(id){

    try {
        
        const ordersRef = collection(DB, "Customized Gifts");
        let ordersQuery = query(
            ordersRef,
            where("UserID", "==",encryptData(id)), 
        );
        const data = await getDocs(ordersQuery)
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
}else{
    return NextResponse.json({ error: 'Access Forbiden' }, { status: 403 });

}

}
