import "server-only"
import { NextResponse, NextRequest } from 'next/server';
import { DB } from '@/Firebase/Initialisation';
import { decryptData, encryptData } from '@/app/Utils/Encryption';
import {  updateUserField } from '@/Firebase/CRUD/User';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getProductsperID } from '@/Firebase/CRUD/Products';

export async function POST(req: NextRequest) {
    const { idToken, Chart } = await req.json();
        try {
            
           let  DATAChart=Chart.map((product: { ProductID: any; Quantity: any; })=>{
                return{
                    ProductID:decryptData(product.ProductID),
                    Quantity:product.Quantity
                }
            })
            let Products = await Promise.all(
                DATAChart.map(async (product: { ProductID: any; Quantity: any; }) => 
                    await getProductsperID(product.ProductID)
                )
            );
            return NextResponse.json({ Products,DATAChart }, { status: 200 });
            
        }  catch (error) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }
    