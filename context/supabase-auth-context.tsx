"use client";

import { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import useSWR from "swr";
import { useSupabase } from "./supabase-context";

interface SupabaseAuthContext {
  user: any;
  error: any;
  isLoading: boolean;
  mutate: any;
  signOut: () => Promise<void>;
  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<{
    user: User;
  } | null>;
}

const Context = createContext<SupabaseAuthContext>({
  user: null,
  error: null,
  isLoading: true,
  mutate: null,
  signOut: async () => {},
  signInWithEmail: async (email: string, password: string) => null,
});

export default function SupabaseAuthProvider({
  serverSession,
  children,
}: {
  serverSession?: Session | null;
  children: React.ReactNode;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();
  console.log("session", serverSession);

  // Get USER
  const getUser = async () => {
    const { data: user, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", serverSession?.user?.id)
      .single();
    if (error) {
      console.log(error);
      return null;
    } else {
      return user;
    }
  };

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR(serverSession ? "profile-context" : null, getUser);

  // Sign Out
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Sign-In with Email
  const signInWithEmail = async (email: string, password: string) => {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error.message;
    }

    return { user };
  };

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
    user,
    error,
    isLoading,
    mutate,
    signOut,
    signInWithEmail,
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
