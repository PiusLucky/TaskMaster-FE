"use client";
import LoginForm from "@/components/auth/LoginForm";
import React from "react";

function Login() {
  return (
    <div className="flex justify-center lg:mt-[-10rem]">
      <div className="w-[39.875rem] z-[1]">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
