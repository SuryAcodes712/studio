"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { getAdvice, getSchemeAnalysis, type AdviceState, type SchemeAnalysisState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Send, Sparkles, User, FileText, ImageIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { textToSpeech } from "@/ai/flows/text-to-speech";

type Message = {
  role: 'user' | 'assistant';
  content: string;
  imagePreview?: string | null;
  fileName?: string | null;
  audioDataUri?: string;
}

const initialAdviceState: AdviceState = {};
const initialSchemeState: SchemeAnalysisState = {};

export default function ChatPage() {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  // State for uploaded file
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'pdf' | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (file.type.startsWith("image/")) {
          setFileData(result);
          setFileType('image');
          setFileName(file.name);
        } else if (file.type === 'application/pdf') {
           // For this prototype, we'll just use a mock text content for PDFs.
          const mockText = `This is a placeholder for the content of ${file.name}. In a real app, this would be the extracted text from the PDF.`;
          setFileData(mockText);
          setFileType('pdf');
          setFileName(file.name);
        } else {
          toast({
            variant: "destructive",
            title: "Invalid File Type",
            description: "Please upload an image or PDF file.",
          });
        }
      };
      reader.onerror = () => {
        toast({
            variant: "destructive",
            title: t('chat.error.title'),
            description: t('chat.error.fileRead'),
        });
      }
      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    }
  };

  const handleRemoveFile = () => {
    setFileData(null);
    setFileType(null);
    setFileName(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
    if (docInputRef.current) {
      docInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !fileData) return;

    let userMessage: Message = { role: 'user', content: input };
    if (fileType === 'image' && fileData) {
        userMessage.imagePreview = fileData;
    }
    if (fileType === 'pdf' && fileName) {
        userMessage.fileName = fileName;
    }

    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    
    // Clear file after submitting
    const currentFileData = fileData;
    const currentFileType = fileType;
    handleRemoveFile();

    startTransition(async () => {
        let responseState: AdviceState | SchemeAnalysisState | null = null;
        let responseContent: string | undefined;
        
        const formData = new FormData();
        formData.append('query', input);
        formData.append('language', language);

        if (currentFileType === 'pdf') {
            if(!currentFileData) {
                toast({ variant: 'destructive', title: t('chat.error.title'), description: t('chat.error.noFile')});
                return;
            }
            formData.append('documentContent', currentFileData);
            responseState = await getSchemeAnalysis(initialSchemeState, formData);
            responseContent = (responseState as SchemeAnalysisState)?.answer;
        } else { // Image or text-only query
            if (currentFileType === 'image' && currentFileData) {
                formData.append('photoDataUri', currentFileData);
            }
            responseState = await getAdvice(initialAdviceState, formData);
            responseContent = (responseState as AdviceState)?.advice;
        }
      

      if (responseState?.error) {
        toast({
          variant: "destructive",
          title: t('chat.error.title'),
          description: responseState.error,
        });
        setMessages(newMessages); // Revert to user message only
      }

      if (responseContent) {
        let audioDataUri: string | undefined;
        if (language !== 'en') {
             const ttsResult = await textToSpeech({ text: responseContent });
             audioDataUri = ttsResult.audioDataUri;
        }
        setMessages([...newMessages, { role: 'assistant', content: responseContent, audioDataUri: audioDataUri }]);
        if (audioDataUri) {
             const audio = new Audio(audioDataUri);
             audio.play();
        }
      }
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] items-center justify-between">
       <div className="w-full flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {messages.length === 0 && !isPending && (
                <div className="flex flex-col items-center justify-center h-full text-center pt-24">
                    <Avatar className="h-16 w-16 mb-4 bg-primary text-primary-foreground">
                        <AvatarFallback><Sparkles className="h-8 w-8"/></AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-semibold text-foreground">{t('chat.title')}</h1>
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
                  {message.imagePreview && (
                    <Image src={message.imagePreview} alt="User upload" width={200} height={200} className="rounded-md mb-2" />
                  )}
                  {message.fileName && (
                    <div className="mb-2 p-2 rounded-md bg-background/50 flex items-center gap-2">
                        <FileText className="h-5 w-5"/>
                        <span className="text-sm font-medium">{message.fileName}</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{message.content}</p>
                   {message.audioDataUri && (
                    <audio controls src={message.audioDataUri} className="w-full mt-2 filter-primary">
                      {t('advice.results.audioNotSupported')}
                    </audio>
                  )}
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-10 w-10">
                     {userAvatar ? (
                      <Image
                        src={userAvatar.imageUrl}
                        alt={userAvatar.description}
                        data-ai-hint={userAvatar.imageHint}
                        className="rounded-full"
                        width={40}
                        height={40}
                      />
                    ) : <AvatarFallback><User /></AvatarFallback>}
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
      </div>

      <div className="w-full max-w-3xl p-4 border-t border-transparent">
        {fileName && (
            <div className="mb-2">
                <Alert>
                    <div className="flex items-center gap-2">
                     {fileType === 'image' && <ImageIcon className="h-4 w-4" />}
                     {fileType === 'pdf' && <FileText className="h-4 w-4" />}
                     <AlertTitle className="font-semibold">{fileName}</AlertTitle>
                    </div>
                    <AlertDescription className="flex justify-between items-center">
                        File is ready to be sent.
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={handleRemoveFile}
                        >
                            <span className="sr-only">Remove file</span>
                            <X className="h-4 w-4" />
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2 items-center bg-background border rounded-full p-2">
          <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full flex-shrink-0"
                    disabled={isPending}
                >
                    <Plus className="h-6 w-6" />
                    <span className="sr-only">Attach file</span>
                </Button>
            </PopoverTrigger>
             <PopoverContent className="w-auto p-2 mb-2 border-none shadow-xl" align="start">
                <div className="flex flex-col gap-2">
                    <Button
                        variant="outline"
                        className="flex h-12 w-32 items-center justify-start gap-2 px-3"
                        onClick={() => imageInputRef.current?.click()}
                    >
                       <ImageIcon className="h-5 w-5"/> 
                       <span className="text-sm">Image</span>
                    </Button>
                     <Button
                        variant="outline"
                        className="flex h-12 w-32 items-center justify-start gap-2 px-3"
                        onClick={() => docInputRef.current?.click()}
                    >
                       <FileText className="h-5 w-5"/> 
                       <span className="text-sm">Document</span>
                    </Button>
                </div>
            </PopoverContent>
          </Popover>

          <input type="file" ref={imageInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          <input type="file" ref={docInputRef} onChange={handleFileChange} className="hidden" accept="application/pdf" />
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chat.placeholder')}
            className="flex-1 text-base bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isPending}
          />

          <Button type="submit" size="icon" className="rounded-full flex-shrink-0" disabled={isPending || (!input.trim() && !fileData)}>
            <Send className="h-6 w-6" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
