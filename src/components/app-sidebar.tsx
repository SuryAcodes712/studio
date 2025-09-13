"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  History,
  Home,
  LayoutDashboard,
  Leaf,
  Lightbulb,
  HeartPulse,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/diagnose", icon: HeartPulse, label: "Diagnose" },
  { href: "/advice", icon: Lightbulb, label: "Get Advice" },
  { href: "/library", icon: BookOpen, label: "Library" },
  { href: "/history", icon: History, label: "History" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-primary font-headline">
          <Leaf className="h-6 w-6" />
          <span>Krishi Sahayak</span>
        </Link>
      </SidebarHeader>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className={cn(
                  "justify-start",
                  pathname === item.href &&
                    "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                )}
              >
                <a>
                  <item.icon className="mr-2 h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
         {/* Footer content can go here */}
      </SidebarFooter>
    </Sidebar>
  );
}
