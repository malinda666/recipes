"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { app } from "../../../constants";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const navLinks = [
  {
    path: "/",
    name: "HOME",
  },
  { path: "/favourite", name: "FAVOURITE" },
];

const Layout = ({ children, className }: LayoutProps) => {
  const router = useRouter();

  return (
    <main className={cn(className)}>
      <header className="container mx-auto flex items-center justify-between py-6">
        <h3 className="text-3xl text-center font-semibold tracking-tight text-pink-500">
          {app.name}
        </h3>
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link href={link.path} key={link.path}>
              <span
                className={cn(
                  "text-sm",
                  router.pathname === link.path
                    ? "font-semibold"
                    : "font-normal"
                )}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut />
        </Button>
      </header>

      {children}
    </main>
  );
};

export default Layout;
