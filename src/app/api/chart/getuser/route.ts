import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from '@/Firebase/Initialisation';
import { decryptData, encryptData } from '@/app/Utils/Encryption';
import {  updateUserField } from '@/Firebase/CRUD/User';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getProductsperID } from '@/Firebase/CRUD/Products';

export async function GET(req: NextRequest) {
    const  id  = req.nextUrl.searchParams.get('id'); // Get query parameter

    try {
        let Chart
        let Products
        

        const data = await getDoc(doc(DB,"Users/"+id))
        if( data.exists())
        {
            
            Chart=data.data().Chart
            Chart=Chart.map((product: { ProductID: any; Quantity: any; })=>{
                return{
                    id:decryptData(product.ProductID),
                    Quantity:product.Quantity
                }
            })
            Products = await Promise.all(
                Chart.map(async (product: { id: any; Quantity: any; }) => 
                    await getProductsperID(product.id)
                )
            );

            
        }
        else{
            NextResponse.json({ error: 'User does not  exists' }, { status: 404 })
        }

        return NextResponse.json({ data: {Chart,Products},status:200 });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
