"use client";

import { useRef, useState, useTransition, useEffect } from "react";
import { getSchemeAnalysis, type SchemeAnalysisState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Send, Sparkles, User, Paperclip, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/context/language-context";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const initialState: SchemeAnalysisState = {};

export default function SchemesPage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !documentContent) {
        toast({
            variant: "destructive",
            title: t('schemes.error.title'),
            description: "Please upload a document and ask a question.",
        });
        return;
    }

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput("");

    const formData = new FormData();
    formData.append('query', input);
    formData.append('documentContent', documentContent);
    
    startTransition(async () => {
      const state = await getSchemeAnalysis(initialState, formData);

      if (state.error) {
        toast({
          variant: "destructive",
          title: t('schemes.error.title'),
          description: state.error,
        });
        setMessages(newMessages);
      }
      if (state.answer) {
        setMessages([...newMessages, { role: 'assistant', content: state.answer }]);
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // NOTE: This is a placeholder for actual PDF parsing.
      // For a real application, you would use a library like pdf.js or pdf-parse
      // on the client or server to extract text.
      // For this prototype, we'll just use a mock text content.
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = `This is a placeholder for the content of ${file.name}. In a real app, this would be the extracted text from the PDF.`;
            setDocumentContent(text);
            setDocumentName(file.name);
            toast({
                title: "File Uploaded (Mock)",
                description: `${file.name} was uploaded. Text extraction is mocked for this prototype.`,
            });
        };
        reader.onerror = () => {
             toast({
                variant: "destructive",
                title: "Error Reading File",
                description: "There was an error reading the file.",
            });
        }
        reader.readAsText(file); // Reading as text for this mock
      } else {
         toast({
            variant: "destructive",
            title: "Invalid File Type",
            description: "Please upload a PDF file.",
        });
      }
    }
  };

  const handleRemoveDocument = () => {
    setDocumentContent(null);
    setDocumentName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  return (
    <Card className="flex flex-col h-[calc(100vh-8rem)]">
      <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <FileText className="h-10 w-10 text-primary" />
            <div>
              <CardTitle>{t('schemes.title')}</CardTitle>
              <CardDescription>{t('schemes.description')}</CardDescription>
            </div>
          </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-6 pr-4">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">{t('schemes.results.waiting')}</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'assistant' && (
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarFallback>
                      <Sparkles />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-lg p-4 max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-10 w-10">
                     {userAvatar ? (
                      <AvatarImage
                        src={userAvatar.imageUrl}
                        alt={userAvatar.description}
                        data-ai-hint={userAvatar.imageHint}
                      />
                    ) : null}
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isPending && (
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarFallback>
                      <Sparkles />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-4 max-w-[80%] bg-muted">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <p>Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </ScrollArea>
      </CardContent>
      <div className="p-4 border-t">
        {documentName && (
          <div className="mb-2">
            <Alert>
                <FileText className="h-4 w-4" />
                <AlertTitle className="font-semibold">{documentName}</AlertTitle>
                <AlertDescription className="flex justify-between items-center">
                    PDF document is ready to be analyzed.
                     <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={handleRemoveDocument}
                        >
                        <X className="h-4 w-4" />
                        </Button>
                </AlertDescription>
            </Alert>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="application/pdf" />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending || !!documentName}
          >
            <Paperclip className="h-6 w-6" />
            <span className="sr-only">Attach PDF</span>
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('schemes.placeholder')}
            className="flex-1 text-base"
            disabled={isPending}
          />
          <Button type="submit" size="icon" disabled={isPending || !input.trim() || !documentContent}>
            <Send className="h-6 w-6" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </Card>
  );
}
