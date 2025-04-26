import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { id, username, email } = await request.json();

    const { error } = await supabase
        .from('users')
        .update({
            username: username,
            email: email,
        })
        .eq('id', id) 
        .select();

        

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json(
      { message: "User inserted successfully" },
      { status: 200 }
    );
  }
}
