import "server-only"
import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from "../../../../Firebase/Initialisation";
import { decryptData, encryptData } from '../../../../app/Utils/Encryption';
import { getCurrentFirestoreTimestamp } from '../../../../app/Utils/time';
export async function PUT(req: NextRequest) {
    
    const { id,Review,userId } = await req.json();

    try {
        
        let Reviewdata={
            ...Review,
            cryptedUserID:encryptData(userId),
            ProductID:encryptData(id),
        }
        delete Reviewdata.id
            return NextResponse.json({  Reviewdata });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { Review,userId } = await req.json();
        
        try {
            
                let Reviewdata={
                    ...Review,
                    UserID:userId,
                    cryptedUserID:encryptData(userId),
                    ProductID:encryptData(Review.ProductID),
                    dateAdded:getCurrentFirestoreTimestamp()
                }
        
            
            return NextResponse.json({Reviewdata},{ status: 200 });
        }
    
         catch (error) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
}
