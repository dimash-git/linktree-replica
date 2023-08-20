"use client";
import { createClient } from "@/lib/supabase-browser";
import { type SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useState } from "react";

type SupabaseContext = {
  supabase: SupabaseClient;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

// Only One Browser Client for whole app
export default function SupabaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createClient());

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};
