import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import "server-only";

export const createClient = () => createRouteHandlerClient({ cookies });
