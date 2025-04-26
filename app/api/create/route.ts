import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { username, email, password } = await request.json();
  
  const { data: users, error } = await supabase
    .from("users")
    .insert([{ username, email, password }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json(
      { message: "User inserted successfully" },
      { status: 200 }
    );
  }
}
