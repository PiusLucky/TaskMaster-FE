"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/auth/login");
    }, 500);
  }, []);
  return (
    <div>
      Hey, welcome to TaskMaster, please hold on while we redirect you to the
      login page....
    </div>
  );
}
