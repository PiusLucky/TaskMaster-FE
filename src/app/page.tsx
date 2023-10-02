"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth/login");
  }, []);
  return (
    <div>Hey, please hold on while we redirect you to teh login page....</div>
  );
}
