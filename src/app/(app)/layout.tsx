"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/language-context';


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useLanguage();
  
  const navItems: {id: string; href: string; label: string}[] = t('nav', { returnObjects: true });
  const title = navItems.find(item => item.href === pathname)?.label ?? t('nav.0.label');

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <div className="flex flex-1 flex-col min-w-0">
           <AppHeader title={title} />
          <SidebarInset>
            <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
