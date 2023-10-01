"use client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { AlignCenter, ChevronDown, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient, cookieStorageManager } from "@/api";
import { useSetAtom } from "jotai";
import { ATOMS } from "@/api/atoms";
import { STATUS_OK } from "@/lib/defaultConfig";


function NavbarDashboard() {
  const [position, setPosition] = React.useState("bottom");
  const setError = useSetAtom(ATOMS.axiosError);
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = async () => {
    try {
      const { meta } = await apiClient.post("/user", "/logout", {}, setError);

      if (meta.statusCode === STATUS_OK) {
        setTimeout(() => {
          router.push("/", { scroll: false });
          cookieStorageManager.clearAll();
        }, 500);
      }
    } catch (error) {}
  };

  return (
    <div className="md:sticky md:top-0 md:pt-1 md:bg-white md:shadow-md z-20">
      {/* DESKTOP */}
      <div className="mt-[.4rem] hidden lg:block animate-in fade-in zoom-in">
        <div className="flex justify-between mx-[41px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <Link href="/dashboard/wallets">
              <img
                src="/images/full_logo.png"
                alt="logo"
                className="mr-[53px] w-[7rem] "
              />
            </Link>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-[0.75rem] select-none hover:cursor-pointer">
                <img src="/svgs_dashboard/user.svg" alt="user icon" />
                <span>My Account </span>
                <img
                  src="/svgs_dashboard/chevron_down.svg"
                  alt="chevron down icon"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-4 w-[13rem]">
              <DropdownMenuLabel>Account Panel</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="logout" onClick={handleLogout}>
                  Logout
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Separator className="mt-[.5rem]" />
      </div>
      {/* MOBILE */}
      <div
        className={` block lg:hidden animate-in fade-in zoom-in  ${
          menu ? " bg-primary py-2" : "mt-[.2rem]"
        } `}
      >
        <div className="flex justify-between mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <Link href="/dashboard/wallets">
              <img
                src={`${menu ? "/svgs/logo_white.svg" : "/svgs/logo.svg"}`}
                alt="logo"
                className="w-[7rem]"
              />
            </Link>
          </div>
          <div className="flex items-center gap-[40px]">
            {menu ? (
              <X
                className="cursor-pointer animate-in fade-in zoom-in text-white"
                onClick={toggleMenu}
              />
            ) : (
              <AlignCenter
                onClick={toggleMenu}
                className="cursor-pointer animate-in fade-in zoom-in"
              />
            )}
          </div>
        </div>
        {menu ? (
          <div className="my-8 select-none animate-in slide-in-from-right">
            <div className="flex flex-col gap-8 mt-8 mx-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-[0.75rem] select-none hover:cursor-pointer">
                    <span className="text-white">My Account </span>
                    <ChevronDown color="#fff" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-4 w-[13rem]">
                  <DropdownMenuLabel>Account Panel</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuRadioItem
                      value="logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <Separator className="mt-[4px]" />
        )}
      </div>
    </div>
  );
}

export default NavbarDashboard;
