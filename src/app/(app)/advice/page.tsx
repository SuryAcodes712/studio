"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { getAdvice, type AdviceState } from "@/app/actions";
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
import { Mic, Send, Sparkles, Square, User, Paperclip, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/context/language-context";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  imagePreview?: string | null;
  audioDataUri?: string;
}

const initialState: AdviceState = {};

export default function AdvicePage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
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
    if (!input.trim() && !imagePreview) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input, imagePreview }];
    setMessages(newMessages);
    setInput("");
    setImagePreview(null);

    const formData = new FormData();
    formData.append('query', input);
    formData.append('language', language);
    if (imagePreview) {
      formData.append('photoDataUri', imagePreview);
    }
    
    startTransition(async () => {
      const state = await getAdvice(initialState, formData);

      if (state.error) {
        toast({
          variant: "destructive",
          title: t('advice.error.title'),
          description: state.error,
        });
        setMessages(newMessages);
      }
      if (state.advice) {
        setMessages([...newMessages, { role: 'assistant', content: state.advice, audioDataUri: state.audioDataUri }]);
        if (state.audioDataUri) {
          const audio = new Audio(state.audioDataUri);
          audio.play();
        }
      }
    });
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        toast({
          variant: "destructive",
          title: t('advice.error.voiceNotSupported.title'),
          description: t('advice.error.voiceNotSupported.description'),
        });
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = language;
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[event.results.length -1][0].transcript;
        setInput(transcript);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      }

      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  return (
    <Card className="flex flex-col h-[calc(100vh-8rem)]">
      <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Sparkles className="h-10 w-10 text-primary" />
            <div>
              <CardTitle>{t('advice.title')}</CardTitle>
              <CardDescription>{t('advice.description')}</CardDescription>
            </div>
          </div>
          <Select name="language" value={language} onValueChange={setLanguage}>
              <SelectTrigger className="text-base w-48">
                <SelectValue placeholder={t('advice.language.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {t('advice.language.options', { returnObjects: true }).map((lang: { value: string; label: string }) => (
                  <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-6 pr-4">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">{t('advice.results.waiting')}</p>
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
        {imagePreview && (
          <div className="relative mb-2 w-24 h-24">
            <Image src={imagePreview} alt="Image preview" layout="fill" className="rounded-md object-cover" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending}
          >
            <Paperclip className="h-6 w-6" />
            <span className="sr-only">Attach image</span>
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('advice.placeholder')}
            className="flex-1 text-base"
            disabled={isPending}
          />
           <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleToggleRecording}
            className={`h-auto px-4 py-2 ${isRecording ? "bg-destructive text-destructive-foreground" : ""}`}
            disabled={isPending}
          >
            {isRecording ? (
              <Square className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
            <span className="sr-only">{isRecording ? t('advice.voice.stop') : t('advice.voice.start')}</span>
          </Button>
          <Button type="submit" size="icon" disabled={isPending || (!input.trim() && !imagePreview)}>
            <Send className="h-6 w-6" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </Card>
  );
}

function Loader2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
