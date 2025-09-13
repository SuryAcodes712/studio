import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { headers } from 'next/headers';
import { siteConfig } from '@/lib/site-config';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = headers().get('next-url') || '';
  
  const navItem = siteConfig.nav.find(item => item.href === pathname);
  const title = navItem ? navItem.label : 'Dashboard';

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
