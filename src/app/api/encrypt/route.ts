import "server-only";
import { NextResponse, NextRequest } from 'next/server';
import { decryptData,encryptData } from '../../Utils/Encryption';
import { doc, getDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
    const  {id,data}  =await  req.json(); // Get query parameter
    if(id ){
        // 
        // 
        // 
        try {
            return NextResponse.json({ data: encryptData(data) }, { status: 200 });
        }
        catch (error) {
            return NextResponse.json({ error: error }, { status: 500 });
        }
    }else{ 
        return NextResponse.json({ error: 'no ID Error' }, { status: 500 });
    }
}
