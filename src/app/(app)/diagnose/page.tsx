
"use client";

import { useState, useEffect, useRef, useActionState } from "react";
import Image from "next/image";
import { diagnosePlant, type DiagnosisState } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadCloud, X, Sparkles, Loader2, HeartPulse } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";

const initialState: DiagnosisState = {};

export default function DiagnosePage() {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(diagnosePlant, initialState);
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: t('diagnose.error.title'),
        description: state.error,
      });
    }
    // On successful diagnosis, we don't clear the image anymore,
    // allowing the user to see the image and the result together.
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
  
  const handleFormSubmit = (formData: FormData) => {
    if (!imagePreview) {
        toast({
            variant: "destructive",
            title: t('diagnose.error.title'),
            description: "Please upload an image first.",
        });
        return;
    }
    formAction(formData);
  }

  return (
    <div className="flex justify-center items-start p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
            <div className="flex items-center gap-4">
                <HeartPulse className="h-10 w-10 text-primary" />
                <div>
                    <CardTitle>{t('diagnose.title')}</CardTitle>
                    <CardDescription>
                        {t('diagnose.description')}
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
        <form ref={formRef} action={handleFormSubmit}>
            <CardContent className="space-y-6">
                <input
                type="hidden"
                name="photoDataUri"
                value={imagePreview || ""}
                />
                
                {!imagePreview && (
                    <div
                    className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center hover:bg-muted/50"
                    onClick={() => fileInputRef.current?.click()}
                    >
                        <UploadCloud className="mb-2 h-14 w-14 text-muted-foreground" />
                        <p className="font-semibold">{t('diagnose.image.upload')}</p>
                        <p className="text-xs text-muted-foreground">
                            {t('diagnose.image.formats')}
                        </p>
                    </div>
                )}
                
                <input
                    ref={fileInputRef}
                    name="imageFile"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {imagePreview && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                         <Image
                            src={imagePreview}
                            alt="Plant preview"
                            fill
                            className="object-contain"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={handleRemoveImage}
                            className="absolute right-2 top-2 h-8 w-8"
                        >
                            <X className="h-5 w-5" />
                             <span className="sr-only">Remove Image</span>
                        </Button>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <SubmitButton className="w-full text-lg py-6" disabled={!imagePreview || isPending}>
                    {t('cta.diagnose')}
                </SubmitButton>

                {isPending && (
                    <div className="w-full flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <p>Analyzing your plant, please wait...</p>
                    </div>
                )}

                {state.diagnosis && !isPending && (
                    <div className="w-full p-4 border rounded-lg bg-muted/50">
                        <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                            <Sparkles className="h-6 w-6 text-primary" />
                            {t('diagnose.results.title')}
                        </h3>
                        <div
                        className="prose prose-sm max-w-none text-foreground dark:prose-invert"
                        dangerouslySetInnerHTML={{
                            __html: state.diagnosis,
                        }}
                        />
                    </div>
                )}

                {!state.diagnosis && !isPending && !imagePreview && (
                    <p className="text-sm text-muted-foreground text-center">
                        {t('diagnose.results.waiting')}
                    </p>
                )}
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
