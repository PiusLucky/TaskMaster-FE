"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { apiClient, cookieStorageManager } from "@/api";
import { useSetAtom } from "jotai";
import { ATOMS } from "@/api/atoms";
import { STATUS_OK } from "@/lib/defaultConfig";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/types/global-types";
import { storageKeys } from "@/api/storageKeys";
import apiResources from "@/api/resources";
import { capitalizeFirstLetter, getFirstLetters } from "@/lib/utils";

function NavbarDashboard() {
  const user = cookieStorageManager.getItem<UserData>(storageKeys.user);

  const [position, setPosition] = React.useState("bottom");
  const [loadedUsername, setLoadedUsername] = React.useState<string | null>(
    null,
  );
  const setError = useSetAtom(ATOMS.axiosError);
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = async () => {
    try {
      const { meta } = await apiClient.post(
        apiResources.user,
        "/users/logout",
        {},
        setError,
      );

      if (meta.statusCode === STATUS_OK) {
        setTimeout(() => {
          router.push("/auth/login", { scroll: false });
          cookieStorageManager.clearAll();
        }, 500);
      }
    } catch (error) {}
  };

  useEffect(() => {
    setLoadedUsername(user?.full_name || "");
  }, [user?.full_name]);

  return (
    <div className="md:sticky md:top-0 md:pt-1 md:bg-white md:shadow-md z-20 ">
      {/* DESKTOP */}
      <div className="mt-[.4rem] hidden lg:block animate-in fade-in zoom-in">
        <div className="flex justify-between mx-[41px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <img src="/images/full_logo.png" alt="logo" className="mr-[53px]" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-[0.75rem] select-none hover:cursor-pointer">
                <p>{capitalizeFirstLetter(loadedUsername || "")}</p>
                <Avatar>
                  <AvatarFallback>
                    {getFirstLetters(loadedUsername || "TM")}
                  </AvatarFallback>
                </Avatar>
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
                  <div className="text-danger flex gap-2 cursor-pointer">
                    <img src="/svgs/logout.svg" alt="logout icon" />
                    <p className="text-[0.875rem]">Logout</p>
                  </div>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Separator className="mt-[.5rem]" />
      </div>
      {/* MOBILE */}
      <div
        className={` block lg:hidden animate-in fade-in zoom-in shadow-lg   ${
          menu ? " bg-white py-2" : "mt-[.2rem]"
        } `}
      >
        <div className="flex justify-between mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none pt-2 pb-2">
            <img src="/images/full_logo.png" alt="logo" className="w-[10rem]" />
          </div>
          <div className="flex items-center gap-[40px]">
            {menu ? (
              <X
                className="cursor-pointer animate-in fade-in zoom-in text-black"
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
                    <span className="text-black">My Account </span>
                    <ChevronDown color="#000" />
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
