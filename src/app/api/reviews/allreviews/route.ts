import { NextResponse, NextRequest } from 'next/server';
import { auth } from '../../../../Firebase/Initialisation';
import { decryptData } from '../../../../app/Utils/Encryption';
import { getAllReviews } from '../../../../Firebase/CRUD/Reviews';
import { getUserRole } from '../../../../Firebase/Utils'; // Adjust the import path

export async function GET(req: NextRequest) {
        const  id  = req.nextUrl.searchParams.get('id'); // Get query parameter
        try {
            if (!id) {
                return NextResponse.json({ error: 'User not authorized' }, { status: 401 });
            }
            
            const userRole = await getUserRole(id);
            if (userRole !== 'admin') {
                return NextResponse.json({ error: 'Access Forbidden' }, { status: 403 });
            }

            const data = await getAllReviews(null,10);
            const reviews = data.reviews;
            const lastVisible = data.lastVisible;

            

            return NextResponse.json({ data: reviews, lastVisible }, { status: 200 });

        } catch (error) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }

