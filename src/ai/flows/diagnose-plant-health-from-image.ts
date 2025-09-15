'use server';

/**
 * @fileOverview An AI agent that diagnoses plant health from an image.
 *
 * - diagnosePlantHealthFromImage - A function that handles the plant health diagnosis process from an image.
 * - DiagnosePlantHealthFromImageInput - The input type for the diagnosePlantHealthFromImage function.
 * - DiagnosePlantHealthFromImageOutput - The return type for the diagnosePlantHealthFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnosePlantHealthFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type DiagnosePlantHealthFromImageInput = z.infer<typeof DiagnosePlantHealthFromImageInputSchema>;

const DiagnosePlantHealthFromImageOutputSchema = z.object({
  diagnosis: z.string().describe('The diagnosis of the plant health from the image, formatted as simple HTML.'),
});
export type DiagnosePlantHealthFromImageOutput = z.infer<typeof DiagnosePlantHealthFromImageOutputSchema>;

export async function diagnosePlantHealthFromImage(
  input: DiagnosePlantHealthFromImageInput
): Promise<DiagnosePlantHealthFromImageOutput> {
  return diagnosePlantHealthFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnosePlantHealthFromImagePrompt',
  input: {schema: DiagnosePlantHealthFromImageInputSchema},
  output: {schema: DiagnosePlantHealthFromImageOutputSchema},
  prompt: `You are an expert botanist specializing in diagnosing plant illnesses based on images.

You will use the image to diagnose the plant, and any issues it has.

Analyze the following image to determine if the plant is healthy or not, and describe any potential diseases, pests, or nutrient deficiencies. Explain your reasoning. 

Your response MUST be formatted as a simple HTML block. Use tags like <h3> for titles, <p> for paragraphs, and <ul><li> for lists. Do not include any CSS or class attributes.

Photo: {{media url=photoDataUri}}`,
});

const diagnosePlantHealthFromImageFlow = ai.defineFlow(
  {
    name: 'diagnosePlantHealthFromImageFlow',
    inputSchema: DiagnosePlantHealthFromImageInputSchema,
    outputSchema: DiagnosePlantHealthFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
