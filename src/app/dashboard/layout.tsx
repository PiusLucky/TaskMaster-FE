import React from "react";
import "../globals.css";
import { Separator } from "@/components/ui/separator";
import NavbarDashboard from "@/components/common/NavbarDashboard";
import Footer from "@/components/common/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="relative bg-white pb-16">
        <NavbarDashboard />
        {children}
        <div className="p-4 md:p-16 mt-8 md:pt-[10rem]">
          <Separator className="mb-8" />
          <Footer />
        </div>
      </div>
    </div>
  );
}
