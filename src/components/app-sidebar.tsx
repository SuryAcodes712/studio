"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  History,
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
import { useLanguage } from "@/context/language-context";


const navIcons = {
  advice: Lightbulb,
  dashboard: LayoutDashboard,
  diagnose: HeartPulse,
  library: BookOpen,
  history: History,
} as const;


export function AppSidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const navItems: any[] = t('nav', { returnObjects: true });

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-primary font-headline">
          <Leaf className="h-8 w-8" />
          <span>{t('name')}</span>
        </Link>
      </SidebarHeader>
      <SidebarMenu>
        {navItems.map((item) => {
          const Icon = navIcons[item.id as keyof typeof navIcons] || LayoutDashboard;
          return (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  className={cn(
                    "justify-start w-full",
                    pathname === item.href &&
                      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  )}
                >
                    <Icon className="mr-2 h-7 w-7" />
                    <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
      <SidebarFooter>
         {/* Footer content can go here */}
      </SidebarFooter>
    </Sidebar>
  );
}
