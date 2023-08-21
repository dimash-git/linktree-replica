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

  const formData = await req.formData();
  const imageBlob = formData.get("image_blob");
  const imageName = formData.get("image_name");

  if (!imageBlob) {
    return new Response("Image not provided", { status: 500 });
  }

  const { user } = session;

  const { data, error } = await supabase.storage
    .from("profile_pictures")
    .upload(`${user.id}/${imageName}`, imageBlob, {
      upsert: true,
    });

  if (error) {
    return new NextResponse(
      `Error updating Supabase (Storage): ${error.message}`,
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(data);
}
