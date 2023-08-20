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

  const { file }: { file: File } = await req.json();

  const { user } = session;

  const { data, error } = await supabase.storage
    .from("profile_pictures")
    .upload(`${user.id}/${file.name}`, file, { upsert: true });

  if (error) {
    return new NextResponse(`Error updating Supabase: ${error.message}`, {
      status: 500,
    });
  }

  return NextResponse.json(data);
}
