import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from '../../../../Firebase/Initialisation';
import { decryptData, encryptData } from '../../../../app/Utils/Encryption';
import { getUserRole } from '../../../../Firebase/Utils'; // Adjust the import path
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

export async function GET(req: NextRequest) {
    const  id  = req.nextUrl.searchParams.get('id'); 
    if(id ){
        
        try {
            const data = await getDoc(doc(DB,"products/",id));
            if(data.exists())
                {
                   const rate= await getRateProduct(data.id)
                   
                   return NextResponse.json({ rate }, { status: 200 });
                }else{
                    return NextResponse.json({ error:"product not found" }, { status: 404 });
                }
        }
         catch (error) {
            return NextResponse.json({ error: error }, { status: 500 });
        }}
    else{ 
        return NextResponse.json({ error: 'no ID Error' }, { status: 500 });
    }
}

const getRateProduct=async (id: any)=>{
    const ratesRef = collection(DB, "Ratings");

    let ratesQuery = query(
        ratesRef,
        where("ProductID", "==",encryptData(id)), 
    );
    const querySnapshot = await getDocs(ratesQuery);
    let totalRatings = 0;
    let ratingsCount = 0;
    querySnapshot.forEach(doc => {
        totalRatings += doc.data().rating;
        ratingsCount += 1;
    });
    if(totalRatings>0&&ratingsCount>0)
        return totalRatings/ratingsCount;
    else
        return 0
    

}
