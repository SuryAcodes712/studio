"use client";

import { useRef, useState, useEffect, useActionState } from "react";
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
import { SubmitButton } from "@/components/submit-button";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const initialState: SchemeAnalysisState = {};

export default function SchemesPage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(getSchemeAnalysis, initialState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState<string | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: t('schemes.error.title'),
        description: state.error,
      });
      // Revert user message on error
      setMessages(messages => messages.slice(0, -1));
    }
    if (state.answer) {
      setMessages(messages => [...messages, { role: 'assistant', content: state.answer! }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages]);

  const handleSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;
    if (!query || !documentContent) {
        toast({
            variant: "destructive",
            title: t('schemes.error.title'),
            description: "Please upload a document and ask a question.",
        });
        return;
    }

    setMessages([...messages, { role: 'user', content: query }]);

    formAction(formData);

    setInput("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = () => {
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
        reader.readAsText(file);
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
    setMessages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  return (
    <Card className="flex flex-col h-[calc(100vh-8rem)]">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
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
            {messages.length === 0 && !isPending && (
              <div className="flex h-full items-center justify-center rounded-lg border border-dashed py-24">
                <div className="text-center">
                   <p className="text-muted-foreground">{t('schemes.results.waiting')}</p>
                </div>
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
        <form ref={formRef} action={handleSubmit} className="flex gap-2">
          <input
            name="documentContent"
            type="hidden"
            value={documentContent || ""}
          />
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
            name="query"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('schemes.placeholder')}
            className="flex-1 text-base"
            disabled={isPending || !documentName}
          />
          <SubmitButton size="icon" disabled={!input.trim() || !documentContent || isPending}>
            <Send className="h-6 w-6" />
            <span className="sr-only">Send</span>
          </SubmitButton>
        </form>
      </div>
    </Card>
  );
}