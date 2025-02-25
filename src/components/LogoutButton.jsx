"use client";

import useAuth from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, LogOut, UserPen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const LogoutButton = () => {
  const { userData } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-x-1 items-center border-0 outline-none focus:outline-none focus:ring-0">
          {userData && (
            <>
              <Avatar className="w-8 h-8 mr-1">
                <AvatarImage src={"/UserAvatar.webp"} />
                {/* <AvatarFallback>{"?" || userData.username[0]}</AvatarFallback> */}
              </Avatar>
              <p className="text-sm">{userData.username}</p>
              <ChevronDown size={13} />
            </>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg shadow-lg">
          <DropdownMenuItem className="px-4 py-1 hover:bg-gray-100 dark:hover:border-neutral-800 flex justify-center">
            <UserPen />
            <span>Профиль</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border-t border-gray-200 dark:border-neutral-800" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="px-4 py-1 hover:bg-gray-100 dark:hover:border-neutral-800 flex justify-center"
          >
            <LogOut />
            <span>Выход</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default LogoutButton;
