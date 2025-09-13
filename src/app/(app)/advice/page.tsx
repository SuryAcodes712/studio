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
import { Sparkles, Mic, Square, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
        title: "Failed to get advice",
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
          title: "Voice search not supported",
          description: "Your browser does not support voice recognition.",
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
          <CardTitle>Get Agricultural Advice</CardTitle>
          <CardDescription>
            Ask our AI assistant any question about farming, crops, pests, or
            market conditions. Use your voice or type your question below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <Select name="language" defaultValue="en">
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="te">Telugu</SelectItem>
                <SelectItem value="mr">Marathi</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              name="query"
              placeholder="e.g., 'What is the best way to prevent blight on tomato plants?'"
              className="min-h-[150px] text-base"
              required
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
            <div className="flex gap-2">
              <SubmitButton className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Advice
              </SubmitButton>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleToggleRecording}
                className={isRecording ? "bg-destructive text-destructive-foreground" : ""}
              >
                {isRecording ? (
                  <Square className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
                <span className="sr-only">{isRecording ? "Stop recording" : "Start recording"}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Recommendation
          </CardTitle>
          <CardDescription>
            The advice from our AI will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.advice ? (
            <div className="space-y-4">
              {state.audioDataUri && (
                <audio controls src={state.audioDataUri} className="w-full">
                  Your browser does not support the audio element.
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
                Waiting for your question...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
