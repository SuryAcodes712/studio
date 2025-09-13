"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { advisoryHistory } from "@/lib/data";
import { Clock, MessageSquare, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export default function HistoryPage() {
  const { t } = useLanguage();
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">{t('history.title')}</h1>
        <p className="text-muted-foreground">
          {t('history.description')}
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {advisoryHistory.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>
              <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between pr-4 gap-2 text-left">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary shrink-0">
                    {item.query.type === "text" ? (
                      <MessageSquare className="h-10 w-10 text-secondary-foreground" />
                    ) : (
                      <ImageIcon className="h-10 w-10 text-secondary-foreground" />
                    )}
                  </div>
                  <span className="flex-1 font-medium">
                    {t(item.query.content as any)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground ml-auto sm:ml-0 pl-16 sm:pl-0">
                  <Clock className="h-6 w-6" />
                  <span>{t(item.date as any)}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col sm:flex-row gap-4 p-4">
                {item.query.type === "image" && item.query.image && (
                  <Image
                    src={item.query.image.imageUrl}
                    alt={item.query.image.description}
                    width={100}
                    height={100}
                    className="rounded-md object-cover self-center sm:self-start"
                    data-ai-hint={item.query.image.imageHint}
                  />
                )}
                <p className="flex-1 text-muted-foreground">{t(item.response as any)}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
