import "server-only";
import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from "../../../../Firebase/Initialisation"
import { decryptData } from '../../../Utils/Encryption';
import { doc, getDoc } from 'firebase/firestore';
import { getReviwesperID, getUserReviews } from '../../../../Firebase/CRUD/Reviews';

export async function GET(req: NextRequest) {
    const  id  = req.nextUrl.searchParams.get('id'); // Get query parameter
    if(id ){
        
        try {
            const data = await getUserReviews(id,null,5);
            if(data)
                {
                    let Reviews = data.reviews

                        if(Reviews)
                        {
                            return NextResponse.json({  Reviews }, { status: 200 });
                        }
                        else{
                            return NextResponse.json({  Reviews:[] }, { status: 200 });
                        }
        }
        } catch (error) {
            return NextResponse.json({ error: error }, { status: 500 });
        }}
    else{ 
        return NextResponse.json({ error: 'no ID Error' }, { status: 500 });
    }
}
