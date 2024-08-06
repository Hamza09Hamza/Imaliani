import { NextResponse, NextRequest } from 'next/server';
import { DB, Storage } from "../../../../Firebase/Initialisation";
import { encryptData } from '../../../../app/Utils/Encryption';
import { getCurrentFirestoreTimestamp } from '../../../../app/Utils/time';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const phoneNumber = formData.get('phoneNumber');
        const streetAddress = formData.get('streetAddress');
        const city = formData.get('city');
        const state = formData.get('state');
        const zipCode = formData.get('zipCode');
        const description = formData.get('description');
        const userId = formData.get('userId');
        
        if (!userId) {
            return NextResponse.json({ error: 'Access Forbidden Error' }, { status: 401 });
        }

        const files = formData.getAll('files');
        
        const imageUrls = await Promise.all(files.map(async (file) => await uploadImage(file)));

        const Giftdata = {
            fullName,
            email,
            phoneNumber,
            ShippingAdresse: {
                streetAddress,
                city,
                state,
                zipCode,
            },
            description,
            Status: {
                Pre_order: getCurrentFirestoreTimestamp(),
                Processing: null,
                In_transit: null,
                Shipped: null,
                Cancelled: null,
            },
            images: imageUrls,
            UserID: encryptData(userId),
            dateAdded: getCurrentFirestoreTimestamp()
        };

        await addDoc(collection(DB, "Customized Gifts"), Giftdata);

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

const uploadImage = async (imageFile:any) => {
    try {
        const buffer = await imageFile.arrayBuffer();
        const blob = new Blob([buffer], { type: imageFile.type });
        const imageRef = storageRef(Storage, `${imageFile.name}`);
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};
