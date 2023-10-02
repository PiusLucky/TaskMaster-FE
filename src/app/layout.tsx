import JotaiProviders from "@/providers/jotai";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SuccessModal } from "@/components/modals/SuccessModal";
import { ErrorModal } from "@/components/modals/ErrorModal";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaskMaster",
  description: "TaskMaster: Unleash Your Productivity Potential",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <JotaiProviders>
        <body className={poppins.className}>{children}</body>
        <SuccessModal />
        <ErrorModal />
      </JotaiProviders>
    </html>
  );
}
