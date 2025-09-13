import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { advisoryHistory } from "@/lib/data";
import { Clock, MessageSquare, Image as ImageIcon } from "lucide-react";

export default function HistoryPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Advisory History</h1>
        <p className="text-muted-foreground">
          Review your past queries and the advice you received.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {advisoryHistory.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>
              <div className="flex w-full items-center justify-between pr-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                    {item.query.type === "text" ? (
                      <MessageSquare className="h-8 w-8 text-secondary-foreground" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-secondary-foreground" />
                    )}
                  </div>
                  <span className="flex-1 text-left font-medium">
                    {item.query.content}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>{item.date}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex gap-4 p-4">
                {item.query.type === "image" && item.query.image && (
                  <Image
                    src={item.query.image.imageUrl}
                    alt={item.query.image.description}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                    data-ai-hint={item.query.image.imageHint}
                  />
                )}
                <p className="flex-1 text-muted-foreground">{item.response}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
