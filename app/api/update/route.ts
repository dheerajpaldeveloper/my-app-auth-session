import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { id, username, email } = await request.json();

  const { data, error } = await supabase
    .from("users")
    .update({
      username,
      email,
    })
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {

  

    // localStorage.setItem("username",usern);
    // localStorage.setItem("email", data[0].email);
    // localStorage.setItem("role", data[0].role);
    // localStorage.setItem("id", data[0].id);
    return NextResponse.json(
      { message: "User inserted successfully", data :data },
      { status: 200 }
    );
  }
}
