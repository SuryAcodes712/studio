"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { User } from "lucide-react";
import { useLanguage } from "@/context/language-context";

type AppHeaderProps = {
  title: string;
};

export function AppHeader({ title }: AppHeaderProps) {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");
  
  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setIsSettingsOpen(false); // Close dialog on change
  }

  return (
    <>
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
              <DropdownMenuLabel>{t('header.account.label')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setIsSettingsOpen(true)}>
                {t('header.account.settings')}
              </DropdownMenuItem>
              <DropdownMenuItem>{t('header.account.support')}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t('header.account.logout')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('header.settings.title')}</DialogTitle>
            <DialogDescription>
             {t('header.settings.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
               <label htmlFor="language-select" className="text-right">
                {t('header.settings.language')}
              </label>
              <Select
                value={language}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger id="language-select" className="col-span-3">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
