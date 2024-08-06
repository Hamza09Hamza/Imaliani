import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from "../../../../Firebase/Initialisation";
import { decryptData, encryptData } from '../../../../app/Utils/Encryption';
import { getCurrentFirestoreTimestamp } from '../../../../app/Utils/time';
import {  updateOrderStatus,getUserOrders } from '../../../../Firebase/CRUD/Oders';
import { getUserRole } from '../../../../Firebase/Utils'; // Adjust the import path
import { doc, getDoc } from 'firebase/firestore';
import { setReview } from '../../../../Firebase/CRUD/Reviews';

export async function PUT(req: NextRequest) {
    
    const { id,Review,userId } = await req.json();
    

    try {
        const data = await getDoc(doc(DB,"Ratings/",id));

        if( data.exists())
        {
           const  review=data.data()
           if(decryptData( review.UserID)==userId ||( await getUserRole(userId))=="admin")
            {
                let Reviewdata={
                    ...Review,
                    UserID:encryptData(userId),
                    ProductID:encryptData(id),
                }
                await setReview(id,Reviewdata);
            }
            else{
                NextResponse.json({ error: 'update forbidden to this review' }, { status: 403 })
            }
           
        }
        else{
            NextResponse.json({ error: 'Review does not  exists' }, { status: 404 })
        }


        return NextResponse.json({ status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
export async function POST(req: NextRequest) {
    
    const { Review,userId } = await req.json();
    

    try {
        
            let Reviewdata={
                ...Review,
                UserID:encryptData(userId),
                ProductID:encryptData(Review.ProductID),
                dateAdded:getCurrentFirestoreTimestamp()
            }
            await setReview(null,Reviewdata);
    
        
        return NextResponse.json({ status: 200 });
    }

     catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
