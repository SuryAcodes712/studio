import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { headers } from 'next/headers';
import { siteConfig } from '@/lib/site-config';
import { redirect } from 'next/navigation'


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = headers().get('next-url') || '';
  
  if (pathname === '/') {
    redirect('/advice');
  }

  const navItem = siteConfig.nav.find(item => `/$(item.href}`.startsWith(pathname));
  const title = navItem ? navItem.label : 'Advice';

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
