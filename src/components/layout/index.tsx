"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return <main className={cn(className)}>{children}</main>;
};

export default Layout;
