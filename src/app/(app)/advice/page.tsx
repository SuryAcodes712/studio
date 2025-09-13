"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { getAdvice, type AdviceState } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sparkles, Mic, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/lib/site-config";

const initialState: AdviceState = {};

export default function AdvicePage() {
  const [state, formAction] = useFormState(getAdvice, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: siteConfig.advice.error.title,
        description: state.error,
      });
    }
    if (state.advice) {
      formRef.current?.reset();
      setTranscript("");
    }
    if (state.audioDataUri) {
      const audio = new Audio(state.audioDataUri);
      audio.play();
    }
  }, [state, toast]);

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
          title: siteConfig.advice.error.voiceNotSupported.title,
          description: siteConfig.advice.error.voiceNotSupported.description,
        });
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript((prev) => prev + finalTranscript + " ");
        }
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      }

      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{siteConfig.advice.title}</CardTitle>
          <CardDescription>
            {siteConfig.advice.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <Select name="language" defaultValue="en">
              <SelectTrigger className="text-base">
                <SelectValue placeholder={siteConfig.advice.language.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {siteConfig.advice.language.options.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              name="query"
              placeholder={siteConfig.advice.placeholder}
              className="min-h-[150px] text-base"
              required
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <SubmitButton className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
                {siteConfig.cta.getAdvice}
              </SubmitButton>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleToggleRecording}
                className={`w-full sm:w-auto h-auto px-4 py-2 ${isRecording ? "bg-destructive text-destructive-foreground" : ""}`}
              >
                {isRecording ? (
                  <Square className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
                <span className="sr-only">{isRecording ? siteConfig.advice.voice.stop : siteConfig.advice.voice.start}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            {siteConfig.advice.results.title}
          </CardTitle>
          <CardDescription>
            {siteConfig.advice.results.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.advice ? (
            <div className="space-y-4">
              {state.audioDataUri && (
                <audio controls src={state.audioDataUri} className="w-full">
                  {siteConfig.advice.results.audioNotSupported}
                </audio>
              )}
              <div
                className="prose prose-sm max-w-none text-foreground"
                dangerouslySetInnerHTML={{
                  __html: state.advice.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground">
                {siteConfig.advice.results.waiting}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
