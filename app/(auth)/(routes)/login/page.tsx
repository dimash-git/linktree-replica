"use client";

import React from "react";

import { useAuth } from "@/context/supabase-auth-context";
import LoginForm from "./login-form";

const Login = () => {
  const { loginWithPassword } = useAuth();

  return (
    <div className="w-full">
      <LoginForm loginWithPassword={loginWithPassword} />
    </div>
  );
};

export default Login;
