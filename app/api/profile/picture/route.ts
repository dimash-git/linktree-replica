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

  const { user } = session;

  // const { image }: { image: File } = await req.json();

  const res = await req.json();
  console.log("req:", req);

  // const { data, error } = await supabase.storage
  //   .from("profile_pictures")
  //   .upload(`${user.id}/${image.name}`, image, { upsert: true });

  // if (error) {
  //   return new NextResponse(
  //     `Error updating Supabase (Storage): ${error.message}`,
  //     {
  //       status: 500,
  //     }
  //   );
  // }

  // console.log("image:", image);

  return NextResponse.json({});
}
