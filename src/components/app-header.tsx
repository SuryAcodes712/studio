import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { User, Check } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type AppHeaderProps = {
  title: string;
};

export function AppHeader({ title }: AppHeaderProps) {
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");
  const languages = ['en', 'hi']; // TODO: Get from config
  const currentLanguage = 'en'; // TODO: Get from state management

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-card px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="text-xl font-semibold md:text-2xl font-headline">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                {userAvatar ? (
                  <AvatarImage
                    src={userAvatar.imageUrl}
                    alt={userAvatar.description}
                    data-ai-hint={userAvatar.imageHint}
                  />
                ) : null}
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{siteConfig.header.account.label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
             <DropdownMenuSub>
              <DropdownMenuSubTrigger>{siteConfig.header.account.language}</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {languages.map((lang) => (
                   <DropdownMenuItem key={lang} >
                    <div className="flex justify-between w-full">
                      <span>{lang === 'en' ? 'English' : 'हिंदी'}</span>
                      {currentLanguage === lang && <Check className="h-4 w-4" />}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{siteConfig.header.account.settings}</DropdownMenuItem>
            <DropdownMenuItem>{siteConfig.header.account.support}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{siteConfig.header.account.logout}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
