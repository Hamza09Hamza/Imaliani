import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from '@/Firebase/Initialisation';
import { decryptData, encryptData } from '@/app/Utils/Encryption';
import {  updateUserField } from '@/Firebase/CRUD/User';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function PUT(req: NextRequest) {
    const { type,id,userid } = await req.json();
    
    try {
        if (!userid) {
            return NextResponse.json({ error: 'User not authorized' }, { status: 401 });
        }
        
        const data = await getDoc(doc(DB,"products/"+id))

        if( data.exists())
        {
            const userdata = await getDoc(doc(DB,"Users/"+userid))
            if(userdata.exists()){
                
                let Chart=userdata.data().Chart
                if(type===true)
                    {
                        if (!Chart.find((prod: any) => decryptData(prod.ProductID) === id)) {
                            Chart = [...Chart, { ProductID: encryptData(id), Quantity: 1 }];
                        }
                    }
                else{
                    Chart = Chart.map((prod:any)=>{return {...prod,ProductID:decryptData(prod.ProductID)}});
                    Chart=Chart.filter((prod:any)=>{;return!(prod.ProductID==id)})
                    console.log(Chart)
                    Chart = Chart.map((prod:any)=>{return {...prod,ProductID:encryptData(prod.ProductID)}});
                }
                
                
                await updateUserField("Chart",Chart,userid);
            }else{
                return NextResponse.json({ error: 'user does not  exists' }, { status: 403 });
            }
        }
        else{
            NextResponse.json({ error: 'Order does not  exists' }, { status: 404 })
        }


        return NextResponse.json({ status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
