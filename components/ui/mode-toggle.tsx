"use client";

import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BoltIcon,
  BookOpenIcon,
  ChevronDownIcon,
  Layers2Icon,
  LogOutIcon,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

export function ModeMenu() {
  const { setTheme, theme } = useTheme();

  function getIcon(current: string) {
    if (current === "light") return <Sun size={16} className="mr-2" />;
    if (current === "dark") return <Moon size={16} className="mr-2" />;
    return (
      <Sun
        size={16}
        className="mr-2 opacity-80 dark:opacity-40"
        aria-hidden="true"
      />
    );
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {getIcon(theme ?? "system")}
        <span>Theme</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun size={16} className="mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon size={16} className="mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Sun size={16} className="mr-2" />
          System
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
