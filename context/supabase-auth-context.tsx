"use client";
import { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Session, User } from "@supabase/supabase-js";
import { useSupabase } from "./supabase-context";

interface SupabaseAuthContext {
  logout: () => Promise<void>;
  loginWithPassword: (
    email: string,
    password: string
  ) => Promise<User | string | null>;
  register: (email: string, password: string) => Promise<User | string | null>;
}

const Context = createContext<SupabaseAuthContext>({
  logout: async () => {},
  loginWithPassword: async (email: string, password: string) => null,
  register: async (email: string, password: string) => null,
});

export default function SupabaseAuthProvider({
  serverSession,
  children,
}: {
  serverSession?: Session | null;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { supabase } = useSupabase();

  // Sign Out
  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Sign In with Email
  const loginWithPassword = async (email: string, password: string) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error.message;
    }

    return user as User;
  };

  const register = async (email: string, password: string) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      return error.message;
    }

    return user as User;
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
    };
  }, [supabase.auth]);

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, serverSession?.access_token]);

  const exposed: SupabaseAuthContext = {
    logout,
    loginWithPassword,
    register,
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
