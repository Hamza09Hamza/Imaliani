import { NextResponse, NextRequest } from 'next/server';
import { DB } from '@/Firebase/Initialisation';
import {  encryptData } from '@/app/Utils/Encryption';
import { doc, getDoc } from 'firebase/firestore';



export async function PUT(req: NextRequest) {
    const {  id,type,Chart } = await req.json();
        try {
        const data = await getDoc(doc(DB,"products/",id))
        let userchart=Chart
        console.log(Chart)
        if( data.exists())
        {
                if(type===true)
                    {
                        const encryptedProductID=encryptData(id)
                        console.log(Chart.find((prod: any) => prod.ProductID === encryptedProductID))
                        if (!userchart.find((prod: any) => prod.ProductID === encryptedProductID)) {
                            userchart = [...userchart, { ProductID: encryptedProductID, Quantity: 1 }];
                        }else{
                            userchart=userchart.map((prod:any)=>{
                                prod.ProductID==encryptedProductID ? prod.Quantity=prod.Quantity+1:null
                                return prod;

                            })  
                        }
                        console.log(userchart)
                        return NextResponse.json({ userchart}, { status: 200 })

                    }
                else{
                    userchart = userchart.map((prod:any)=>{return {...prod,ProductID:prod.ProductID}});
                    userchart=userchart.filter((prod:any)=>{return!(prod.ProductID==id)})
                    userchart = userchart.map((prod:any)=>{return {...prod,ProductID:encryptData(prod.ProductID)}});
                }
                    
                    return NextResponse.json({ userchart}, { status: 200 })
                
            }
            else{
                NextResponse.json({ error: 'product does not  exists' }, { status: 404 })
            }


            return NextResponse.json({ userchart}, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

