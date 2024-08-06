import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from "../../../../Firebase/Initialisation"
import { decryptData, encryptData } from '../../../Utils/Encryption';
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { getProductReviews, getReviwesperID } from '../../../../Firebase/CRUD/Reviews';

export async function GET(req: NextRequest) {
    const  id  = req.nextUrl.searchParams.get('id'); // Get query parameter
    if(id ){
        let result :any;
        try {
            const data = await getProductReviews(id,null,10);
            console.log("result of fetching",data.reviews)
            if(data.reviews)
                {
                    result={
                        reviews:data.reviews,
                        ratingsPerValue:[
                            { 
                                label:0,
                                value: (await productReviewperStar(id,0)).length
                            },
                            { 
                                label:1,
                                value: (await productReviewperStar(id,1)).length
                            },
                            { 
                                label:2,
                                value: (await productReviewperStar(id,2)).length
                            },
                            { 
                                label:3,
                                value: (await productReviewperStar(id,3)).length
                            },
                            { 
                                label:4,
                                value: (await productReviewperStar(id,4)).length
                            },
                            { 
                                label:5,
                                value: (await productReviewperStar(id,5)).length
                            },
                            ]
                        
                        
                    }
                    return   NextResponse.json({result }, { status: 200 });

                }
                else{
                    return NextResponse.json({ data:[] }, { status: 200 });
                }
                


            return   NextResponse.json({result }, { status: 200 });
        }
         catch (error) {
            return NextResponse.json({ error: 'Error getting data' }, { status: 500 });
        }
    }else{ 
        return NextResponse.json({ error: 'no ID Error' }, { status: 404 });
    }
}

async function productReviewperStar(id: string, star: number) {
    try {

        const reviewsQuery = query(
            collection(DB, "Ratings"),
            where("rating", "==", star),
            orderBy("dateAdded", "desc")
        );


        const data = await getDocs(reviewsQuery);
        const result = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        let resultData= result.filter((rev:any)=>decryptData(rev.ProductID)==id)


        return resultData;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw new Error("Failed to fetch product reviews");
    }
}
