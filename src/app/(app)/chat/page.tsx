"use client";

import { useEffect, useRef, useState, useActionState } from "react";
import Image from "next/image";
import { getChatResponse, type ChatState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Send, Sparkles, User, FileText, ImageIcon, Loader2, X, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SubmitButton } from "@/components/submit-button";

type Message = {
  role: 'user' | 'assistant';
  content: string;
  imagePreview?: string | null;
  fileName?: string | null;
  audioDataUri?: string;
}

const initialChatState: ChatState = {};

// For Speech Recognition
let recognition: SpeechRecognition | null = null;
if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
}


export default function ChatPage() {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [state, formAction, isPending] = useActionState(getChatResponse, initialChatState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // State for uploaded file
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'pdf' | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: t('chat.error.title'),
        description: state.error,
      });
      // Revert user message on error
      setMessages(messages => messages.slice(0, -1));
    }
    if (state.response) {
      setMessages(messages => [...messages, { role: 'assistant', content: state.response!, audioDataUri: state.audioDataUri }]);
        if (state.audioDataUri && audioRef.current) {
            audioRef.current.src = state.audioDataUri;
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        }
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

    useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setInput(input + finalTranscript + interimTranscript);
    };
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        let description = event.error;
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            description = "Microphone access was denied. Please allow microphone access in your browser settings.";
        }
      toast({
        variant: "destructive",
        title: "Voice recognition error",
        description: description,
      });
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
        if (recognition) {
            recognition.stop();
        }
    }
  }, [input, toast]);

    const handleVoiceRecording = () => {
    if (!recognition) {
        toast({
            variant: "destructive",
            title: t('advice.error.voiceNotSupported.title'),
            description: t('advice.error.voiceNotSupported.description'),
        });
        return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setInput("");
      recognition.lang = language;
      recognition.start();
      setIsListening(true);
    }
  };

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

  const handleSubmit = (formData: FormData) => {
    if (!input.trim() && !fileData) return;

    if(isListening) {
        recognition?.stop();
        setIsListening(false);
    }
    
    let userMessage: Message = { role: 'user', content: input };
    if (fileType === 'image' && fileData) {
        userMessage.imagePreview = fileData;
    }
    if (fileType === 'pdf' && fileName) {
        userMessage.fileName = fileName;
    }

    setMessages([...messages, userMessage]);
    
    formAction(formData);

    setInput("");
    handleRemoveFile();
  };

  return (
    <div className="flex flex-col h-full w-full">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
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
                {message.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <div
                    className="prose prose-sm max-w-none text-foreground"
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  />
                )}
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
              <div className="rounded-lg p-4 bg-muted">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <p>Thinking...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="w-full max-w-3xl p-4 mx-auto mb-12">
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
        <form ref={formRef} action={handleSubmit} className="flex gap-2 items-center bg-muted/50 border rounded-full p-1 pl-3">
          <input name="language" type="hidden" value={language} />
          <input name="photoDataUri" type="hidden" value={fileType === 'image' ? fileData ?? "" : ""} />
          <input name="documentContent" type="hidden" value={fileType === 'pdf' ? fileData ?? "" : ""} />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full flex-shrink-0 h-10 w-10 md:h-12 md:w-12"
                disabled={isPending}
              >
                <Plus className="h-5 w-5" />
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
            name="query"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening..." : t('chat.placeholder')}
            className="flex-1 text-base bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isPending}
          />
        {isClient && recognition && (
          <Button
            type="button"
            variant={isListening ? "destructive" : "ghost"}
            size="icon"
            className="rounded-full flex-shrink-0"
            onClick={handleVoiceRecording}
            disabled={isPending}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            <span className="sr-only">{isListening ? "Stop listening" : "Start listening"}</span>
          </Button>
        )}
          <SubmitButton size="icon" className="rounded-full flex-shrink-0" disabled={!input.trim() && !fileData}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </SubmitButton>
        </form>
      </div>
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
