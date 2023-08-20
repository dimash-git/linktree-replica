"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Session, User } from "@supabase/supabase-js";
import { useSupabase } from "./supabase-client-context";

interface SupabaseAuthContext {
  user: User | undefined;
  logout: () => Promise<void>;
  loginWithPassword: (
    email: string,
    password: string
  ) => Promise<string | null>;
  register: (email: string, password: string) => Promise<string | null>;
}

const Context = createContext<SupabaseAuthContext>({
  logout: async () => {},
  loginWithPassword: async (email: string, password: string) => null,
  register: async (email: string, password: string) => null,
  user: undefined,
});

export default function SupabaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { supabase } = useSupabase();

  const [session, setSession] = useState<Session | null>();

  // Sign Out
  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Sign In with Email
  const loginWithPassword = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error.message;
    }
    return null;
  };

  const register = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      return error.message;
    }
    return null;
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) setSession(session);
    };

    getSession();
  }, [supabase.auth]);

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.access_token !== session?.access_token) {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, session?.access_token]);

  useEffect(() => {
    console.log("session", session);
  }, [session]);

  const exposed: SupabaseAuthContext = {
    logout,
    loginWithPassword,
    register,
    user: session?.user,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useAuth = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useAuth must be used inside SupabaseAuthProvider");
  }

  return context;
};
