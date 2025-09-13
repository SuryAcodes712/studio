"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { libraryContent } from "@/lib/data";
import { BookText, Film, FileText } from "lucide-react";
import { useLanguage } from "@/context/language-context";

const typeIcons = {
  article: <BookText className="h-6 w-6" />,
  video: <Film className="h-6 w-6" />,
  guide: <FileText className="h-6 w-6" />,
};

export default function LibraryPage() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">{t('library.title')}</h1>
        <p className="text-muted-foreground">
          {t('library.description')}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {libraryContent.map((item) => (
          <Card
            key={item.id}
            className="flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
          >
            <CardHeader className="relative h-48 w-full p-0">
              {item.image ? (
                <Image
                  src={item.image.imageUrl}
                  alt={item.image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={item.image.imageHint}
                />
              ) : null}
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-4">
              <Badge
                variant="secondary"
                className="mb-2 flex w-fit items-center gap-1.5 py-1 px-3"
              >
                {typeIcons[item.type]}
                <span className="capitalize">{t(item.type as any)}</span>
              </Badge>
              <CardTitle className="mb-2 text-lg font-semibold font-headline">{t(item.title as any)}</CardTitle>
              <CardDescription className="flex-1 text-sm">
                {t(item.description as any)}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
