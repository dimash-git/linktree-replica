import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decode } from "base64-arraybuffer";

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there is no user, return 401 Unauthorized
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // const { image }: { image: File } = await req.json();

  const formData = await req.formData();
  const image = formData.get("image");
  const imageName = formData.get("image_name");

  if (!image) {
    return new Response("Image not provided", { status: 500 });
  }

  console.log("image,", image.toString());

  const { user } = session;

  const { data, error } = await supabase.storage
    .from("profile_pictures")
    .upload(`${user.id}/${imageName}`, image, {
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
