import React from "react";
import "../globals.css";
import FirstSection from "@/components/auth/FirstSection";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Auth | TaskMaster",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-white pb-16">
      <div className="z-[-6]">
        <FirstSection />
      </div>
      {children}
      <div className="p-4 md:p-16 mt-8 md:pt-[10rem]">
        <Separator className="mb-8" />
        <Footer />
      </div>
    </div>
  );
}
