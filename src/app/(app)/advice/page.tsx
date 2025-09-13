"use client";

import { useEffect, useRef } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialState: AdviceState = {};

export default function AdvicePage() {
  const [state, formAction] = useFormState(getAdvice, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

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
    }
  }, [state, toast]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Get Agricultural Advice</CardTitle>
          <CardDescription>
            Ask our AI assistant any question about farming, crops, pests, or
            market conditions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <Textarea
              name="query"
              placeholder="e.g., 'What is the best way to prevent blight on tomato plants?'"
              className="min-h-[150px] text-base"
              required
            />
            <SubmitButton className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Get Advice</SubmitButton>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Recommendation
          </CardTitle>
          <CardDescription>
            The advice from our AI will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.advice ? (
            <div
              className="prose prose-sm max-w-none text-foreground"
              dangerouslySetInnerHTML={{
                __html: state.advice.replace(/\n/g, "<br />"),
              }}
            />
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
