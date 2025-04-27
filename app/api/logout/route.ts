import { isAuthenticated } from "@/app/utils/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation';


export async function GET() {
    const cookieStore = await cookies();

    cookieStore.set('session', '', { maxAge: 0, path: '/' });

 
    

    return NextResponse.json(
        { message: "Successfully Logout" },
        { status: 200 }
      );

}

