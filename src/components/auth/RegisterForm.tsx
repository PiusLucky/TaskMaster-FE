"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { apiClient } from "@/api";
import apiResources from "@/api/resources";
import { ATOMS } from "@/api/atoms";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import TMButton from "../common/TMButton";

const formSchema = z.object({
  full_name: z
    .string()
    .min(5, {
      message: "Fullname must be at least 5 characters",
    })
    .max(25, {
      message: "Fullname must be at most 20 characters",
    })
    .toLowerCase(),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(5, {
      message: "Password must be at least 5 characters",
    })
    .max(50, {
      message: "Password must be at most 50 characters",
    }),
});

function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const setError = useSetAtom(ATOMS.axiosError);
  const setSuccess = useSetAtom(ATOMS.axiosSuccess);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const { full_name, email, password } = values;

      const {
        data: { userId, otpId },
      } = await apiClient.post(
        apiResources.user,
        "/users",
        {
          full_name,
          email,
          password,
        },
        setError,
        setSuccess
      );

      setTimeout(() => {
        router.push(`/auth/login`);
      }, 500);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  const togglePaswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="rounded-[2.5rem] shadow-lg p-[2.75rem] bg-white">
      <section className="mb-[2.5rem]">
        <div className="flex justify-between flex-col gap-2 md:flex-row">
          <div className="flex w-[200px] items-center gap-[0.63rem] -ml-2">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-[3rem] md:w-[4rem]"
            />
          </div>
          <div className="text-[#8D8D8D]">
            <p>Account already exist?</p>
            <Link href="/auth/login">
              <p className="text-primary  cursor-pointer font-bold inline-block">
                Login
              </p>
            </Link>
          </div>
        </div>
        <div className="text-[1.2rem] md:text-[1.5rem] font-medium mt-[0.81rem]">
          TaskMaster
        </div>
      </section>
      <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Fullname */}
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl className="relative">
                    <div>
                      <Input
                        placeholder="e.g Paul Doe"
                        {...field}
                        className=" focus:!ring-primary h-[3.125rem]"
                        data-testid="fullname"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        placeholder="e.g pauldoe@gmail.com"
                        {...field}
                        className="focus:!ring-primary h-[3.125rem]"
                        data-testid="email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl className="relative">
                    <div>
                      <Input
                        {...field}
                        className="pr-[4.5rem] focus:!ring-primary h-[3.125rem]"
                        type={!showPassword ? "password" : "text"}
                        data-testid="password"
                      />
                      <div className="bg-[#D9D9D9] cursor-pointer absolute w-[3.6875rem] h-[2.375rem] rounded-[0.5rem] flex justify-center items-center font-bold top-[.35rem] right-1">
                        {showPassword ? (
                          <div onClick={() => togglePaswordVisibility()}>
                            <Eye />
                          </div>
                        ) : (
                          <div onClick={() => togglePaswordVisibility()}>
                            <EyeOff />
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Ensure your password is secure enough by using a mix of
                    upper and lower case, special characters and numbers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-[0.875rem]" data-testid="infotext">
              By clicking the <b>Create Account</b> button below, you agree to
              the TaskMaster
              <span className="text-primary font-bold underline pl-2 pr-2">
                Terms of Use
              </span>
              and
              <span className="text-primary font-bold underline pl-2 pr-2">
                Privacy Policy
              </span>
              .
            </div>

            <TMButton
              text="Signup"
              isSubmitable
              width="w-full"
              isLoading={loading}
              dataTestId="signup-cta"
            />
          </form>
        </Form>
      </section>
    </div>
  );
}

export default RegisterForm;
