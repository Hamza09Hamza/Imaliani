import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from '../../../../Firebase/Initialisation';
import { decryptData, encryptData } from '../../../../app/Utils/Encryption';
import { collection, doc, getDoc } from 'firebase/firestore';

export async function GET(req: NextRequest) {
    const  id  = req.nextUrl.searchParams.get('id'); // Get query parameter
    if(id){

    try {
        
        
        const data = await getDoc(doc(DB,"Customized Gifts",id))
        if(data.exists())
        {
            let result={...data.data(),id:data.id}
            return NextResponse.json({result},{status:200} );

        }
        else{
            NextResponse.json({ error: ' Customized Gifts does not   exists' }, { status: 404 })
        }


    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}else{
    return NextResponse.json({ error: 'Access Forbiden' }, { status: 403 });

}

}
