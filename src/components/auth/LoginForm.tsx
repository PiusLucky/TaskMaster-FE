"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { apiClient, cookieStorageManager } from "@/api";
import { useSetAtom } from "jotai";
import { ATOMS } from "@/api/atoms";
import { storageKeys } from "@/api/storageKeys";
import { useRouter } from "next/navigation";
import apiResources from "@/api/resources";
import { ILoginData, IUserInfo } from "@/types/global-types";
import TMButton from "../common/TMButton";

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(5, {
      message: "Password must be at least 5 characters",
    })
    .max(50, {
      message: "password must be at most 50 characters",
    }),
});

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const setError = useSetAtom(ATOMS.axiosError);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    setLoading(true);
    try {
      cookieStorageManager.clearAll();
      const { data } = await apiClient.post(
        apiResources.user,
        "/users/login",
        {
          email,
          password,
        },
        setError,
      );

      await afterLoginUpdate(data);
    } catch (err) {
      setLoading(false);
    }
  }

  const afterLoginUpdate = async (data: ILoginData) => {
    cookieStorageManager.addOrUpdateItem(storageKeys.token, data.access_token);

    const userInfo = await apiClient.get<IUserInfo>(
      apiResources.user,
      "/users",
      setError,
    );
    cookieStorageManager.addOrUpdateItem(storageKeys.user, userInfo.data);

    //Route to Dashboard
    router.push("/dashboard", { scroll: false });
  };

  const togglePaswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="rounded-[2.5rem] shadow-lg p-[2.75rem] bg-white">
      <section className="mb-[1.81rem]">
        <div className="flex justify-between flex-col gap-2 md:flex-row">
          <div className="flex w-[200px] items-center gap-[0.63rem] -ml-2">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-[3rem] md:w-[4rem]"
            />
          </div>
          <div className="text-[#8D8D8D]">
            <p>No Account ?</p>
            <Link href="/auth/signup">
              <p className="text-primary  cursor-pointer font-bold inline-block">
                Sign up
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        placeholder="Password"
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="!mt-[3rem]">
              <TMButton
                text="Sign in"
                isSubmitable
                width="w-full"
                isLoading={loading}
                data-testid="signin-cta"
              />
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
}


export default LoginForm;
