import { NextResponse, NextRequest } from 'next/server';
import { decryptData, encryptData } from '../../../app/Utils/Encryption';
import { getAllOrders } from '../../../Firebase/CRUD/Oders';
import { getUserRole } from '../../../Firebase/Utils'; // Adjust the import path
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { DB } from '../../../Firebase/Initialisation';

export async function GET(req: NextRequest) {
        const id  = req.nextUrl.searchParams.get('id'); // Get query parameter
        const email  = req.nextUrl.searchParams.get('email'); // Get query parameter
        const password  = req.nextUrl.searchParams.get('password'); // Get query parameter
        console.log(id,email,password)
        try {

            if (!id) {
                return NextResponse.json({ error: 'User not authorized' }, { status: 401 });
            }
            let resdata=await getDoc(doc(DB,"admins/",id))
            if(resdata.exists()){
                const data=resdata.data()
                console.log(data.email===email,data.password===password,data.role==='admin')
                if (data.role !== 'admin') {
                    return NextResponse.json({ error: 'Access Forbidden' }, { status: 403 });
                }else{
                    if (!(data.email===email&&data.password===password)) {
                            return NextResponse.json({ error: 'Email/Password wrong' }, { status: 403 });
                    } else{

                        return NextResponse.json({ result: encryptData(id) }, { status: 200 });
                    } 

                }
            }

            
        } catch (error) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }

