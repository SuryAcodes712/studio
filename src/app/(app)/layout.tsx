"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/language-context';
import { redirect } from 'next/navigation';


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useLanguage();
  
  if (pathname === '/') {
    redirect('/advice');
  }
  const navItems: any[] = t('nav', { returnObjects: true });
  const navItem = navItems.find(item => `/${item.href}` === pathname);
  const title = navItem ? navItem.label : t('nav.0.label');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
           <AppHeader title={title} />
          <SidebarInset>
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
