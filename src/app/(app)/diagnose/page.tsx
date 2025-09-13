"use client";

import { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { diagnosePlant, type DiagnosisState } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadCloud, X, AlertCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialState: DiagnosisState = {};

export default function DiagnosePage() {
  const [state, formAction] = useFormState(diagnosePlant, initialState);
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Diagnosis Failed",
        description: state.error,
      });
    }
  }, [state, toast]);

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
    formRef.current?.reset();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Diagnose Plant Health</CardTitle>
          <CardDescription>
            Upload a clear picture of an affected plant leaf or area to get an
            AI-powered diagnosis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <input
              type="hidden"
              name="photoDataUri"
              value={imagePreview || ""}
            />
            <div
              className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center hover:bg-muted/50"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <>
                  <Image
                    src={imagePreview}
                    alt="Plant preview"
                    width={200}
                    height={200}
                    className="mb-4 max-h-48 w-auto rounded-md object-contain"
                  />
                  <p className="text-sm text-muted-foreground">
                    Image selected. Click to change.
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/80"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <>
                  <UploadCloud className="mb-2 h-12 w-12 text-muted-foreground" />
                  <p className="font-semibold">Click to upload an image</p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, or WEBP recommended.
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <SubmitButton className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Diagnose</SubmitButton>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Diagnosis
          </CardTitle>
          <CardDescription>
            The analysis of your plant will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.diagnosis ? (
            <div
              className="prose prose-sm max-w-none text-foreground"
              dangerouslySetInnerHTML={{
                __html: state.diagnosis.replace(/\n/g, "<br />"),
              }}
            />
          ) : (
            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground">
                Waiting for image submission...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
