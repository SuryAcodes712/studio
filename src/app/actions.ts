"use server";

import { generateAgriculturalAdvice } from "@/ai/flows/generate-agricultural-advice";
import { diagnosePlantHealthFromImage } from "@/ai/flows/diagnose-plant-health-from-image";
import { textToSpeech } from "@/ai/flows/text-to-speech";

export interface AdviceState {
  advice?: string;
  error?: string;
  audioDataUri?: string;
}

export async function getAdvice(
  prevState: AdviceState,
  formData: FormData
): Promise<AdviceState> {
  const query = formData.get("query") as string;
  const language = formData.get("language") as string;
  const photoDataUri = formData.get("photoDataUri") as string | undefined;

  if (!query && !photoDataUri) {
    return { error: "Please enter a query or upload an image." };
  }

  try {
    const result = await generateAgriculturalAdvice({ query, language, photoDataUri });
    
    if (language !== 'en') {
      const ttsResult = await textToSpeech({ text: result.advice });
      return { advice: result.advice, audioDataUri: ttsResult.audioDataUri };
    }
    
    return { advice: result.advice };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to get advice: ${errorMessage}` };
  }
}

export interface DiagnosisState {
  diagnosis?: string;
  error?: string;
}

export async function diagnosePlant(
  prevState: DiagnosisState,
  formData: FormData
): Promise<DiagnosisState> {
  const photoDataUri = formData.get("photoDataUri") as string;

  if (!photoDataUri) {
    return { error: "Please upload an image." };
  }
  
  try {
    const result = await diagnosePlantHealthFromImage({ photoDataUri });
    return { diagnosis: result.diagnosis };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to diagnose plant: ${errorMessage}` };
  }
}
