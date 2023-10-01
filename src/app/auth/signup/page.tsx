"use client";
import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

function Register() {
  return (
    <div className="flex justify-center lg:mt-[-10rem]">
      <div className="w-[39.875rem] z-[1]">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
