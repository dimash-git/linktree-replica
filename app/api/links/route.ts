import { createClient } from "@/lib/supabase-server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("session info", session);

  // If there is no user, return 401 Unauthorized
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { title, url, user_id } = await req.json();

  const { data, error } = await supabase.from("links").insert({
    title,
    url,
    user_id,
  });

  if (error)
    return new NextResponse(`Error updating Supabase: ${error.details}`, {
      status: parseInt(error.code),
    });

  return NextResponse.json(data);
}
