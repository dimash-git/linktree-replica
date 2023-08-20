import { createClient } from "@/lib/supabase-server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there is no user, return 401 Unauthorized
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { title, url, user_id } = await req.json();

  const { data, error } = await supabase.from("links").insert({
    title,
    url,
  });

  if (error) {
    return new NextResponse(`Error updating Supabase: ${error.details}`, {
      status: parseInt(error.code),
    });
  }

  return NextResponse.json(data);
}

export async function GET(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there is no user, return 401 Unauthorized
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // const { searchParams } = new URL(req.url);
  // const userId = searchParams.get("user_id");

  const { data, error } = await supabase.from("links").select();

  if (error) {
    return new NextResponse(`Error updating Supabase: ${error.details}`, {
      status: parseInt(error.code),
    });
  }
  return NextResponse.json(data);
}
