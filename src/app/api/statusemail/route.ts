
import { getUserRole } from "@/Firebase/Utils";
import { NextRequest,NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { admincheck } from "@/Firebase/admintest";
import { getNamedMiddlewareRegex } from "next/dist/shared/lib/router/utils/route-regex";

export async function POST(req:NextRequest){
    const { to, subject, text, html,uid } = await req.json();
    if(await adminchecksadmin(uid)){

        const transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });
        
        try {
            
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: to, 
                subject: subject, 
                text: text, 
                html: html,
            });
            return NextResponse.json({res:'sending email' },{status:200})
            
        } catch (error) {
            console.error('Error sending email:', error);
           return NextResponse.json({error:'Error sending email' },{status:500})
        }
    }else{

        return NextResponse.json({error:'unauthorized user  sending email' },{status:403})

    }
    // NextResponse.json({res:'nothing happend' },{status:404})

  

}
const adminchecksadmin=async(uid:string)=>{
    const {adauth,firestore}=admincheck()
    const userInfo=firestore.collection("admins").doc(uid)
    const doc = await userInfo.get();

    if (doc.exists) {
        return true;  
    } else {
        console.log('No such document!');
        return false;
    }
    
}