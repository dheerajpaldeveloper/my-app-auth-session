import { NextRequest, NextResponse } from "next/server";
import { createClient } from '../../utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    
    let supabase;
    try {
        const cookieStore = cookies();
        supabase = createClient(cookieStore);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Error initializing Supabase client.' },
            { status: 500 }
        );
    }
    console.log('Supabase client initialized successfully');

    try {

        let { data: users, error } = await supabase
            .from('users')
            .select('*')
        
        if (error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 500 }
            );
        }

        if (users === null) {
            return NextResponse.json(
                { success: false, error: 'No users found in the database.' },
                { status: 500 }
            );
        }
    
        return NextResponse.json(
            { success: true, message: 'Users fetched successfully', data: users },
            { status: 200 }
        );


    } catch (error: any) {
        console.error('[API /api/login] Error processing login request:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}