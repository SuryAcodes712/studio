"use client";

import { useState, useEffect, useRef, useActionState } from "react";
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
import { UploadCloud, X, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";

const initialState: DiagnosisState = {};

export default function DiagnosePage() {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(diagnosePlant, initialState);
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: t('diagnose.error.title'),
        description: state.error,
      });
    }
    if (state.diagnosis) {
      // Clear image on successful diagnosis
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [state, toast, t]);

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
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t('diagnose.title')}</CardTitle>
          <CardDescription>
            {t('diagnose.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
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
                    {t('diagnose.image.change')}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground hover:bg-destructive/80"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </>
              ) : (
                <>
                  <UploadCloud className="mb-2 h-14 w-14 text-muted-foreground" />
                  <p className="font-semibold">{t('diagnose.image.upload')}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('diagnose.image.formats')}
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                name="imageFile"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <SubmitButton className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6" disabled={!imagePreview || isPending}>
              {t('cta.diagnose')}
            </SubmitButton>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            {t('diagnose.results.title')}
          </CardTitle>
          <CardDescription>
            {t('diagnose.results.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPending && (
             <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          )}
          {state.diagnosis && !isPending ? (
            <div
              className="prose prose-sm max-w-none text-foreground"
              dangerouslySetInnerHTML={{
                __html: state.diagnosis.replace(/\n/g, "<br />"),
              }}
            />
          ) : (
             !isPending && <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground">
                {t('diagnose.results.waiting')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}