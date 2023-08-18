import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import "server-only";

// TODO
// import type {Database} from "@/types/supabase"

export const createClient = () => createServerComponentClient({ cookies });
