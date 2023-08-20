"use client";

import React from "react";

import { useAuth } from "@/context/supabase-auth-context";
import RegisterForm from "./register-form";

const Register = () => {
  const { register } = useAuth();

  return (
    <div className="w-full">
      <RegisterForm register={register} />
    </div>
  );
};

export default Register;
