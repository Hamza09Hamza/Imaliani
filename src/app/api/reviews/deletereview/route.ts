import { NextResponse, NextRequest } from 'next/server';
import { DB, auth } from "../../../../Firebase/Initialisation"
import { decryptData, encryptData } from '../../../Utils/Encryption';
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { deleteReview } from '../../../../Firebase/CRUD/Reviews';
import { getUserRole } from '../../../../Firebase/Utils';

export async function DELETE(req: NextRequest) {
    const  id  = req.nextUrl.searchParams.get('id');
    const userId = req.nextUrl.searchParams.get('userId'); // Get userId from query parameter
    if(userId){

        if(id ){
    
            try {
                const data = await getDoc(doc(DB,"Ratings/",id));
                if(data.exists()){
                    if(decryptData(data.data().cryptedUserID)===userId){  
                        await deleteReview(data.id);
                    }
                    else{ 
                        return   NextResponse.json({error:"Operation Forbidden" }, { status: 403 });
                    }
    
    
                }else{
                    return   NextResponse.json({error:"Review doesn't exist" }, { status: 404 });
                }
                    
    
    
                return   NextResponse.json({ }, { status: 200 });
            }
             catch (error) {
                return NextResponse.json({ error: 'Error deleting data' }, { status: 500 });
            }
        }else{ 
            return NextResponse.json({ error: 'no ID Error' }, { status: 404 });
        }
    }else{
        return NextResponse.json({ error: 'Unauthorized operation ' }, { status: 401 });
    }
}

