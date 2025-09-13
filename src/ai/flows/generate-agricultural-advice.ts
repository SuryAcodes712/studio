'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating agricultural advice based on user queries.
 *
 * It includes:
 * - generateAgriculturalAdvice: A function to generate agricultural advice.
 * - GenerateAgriculturalAdviceInput: The input type for the generateAgriculturalAdvice function.
 * - GenerateAgriculturalAdviceOutput: The output type for the generateAgriculturalAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAgriculturalAdviceInputSchema = z.object({
  query: z.string().describe('The agricultural question or problem from the farmer.'),
  language: z.string().optional().describe('The language for the response (e.g., "Hindi", "English").'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateAgriculturalAdviceInput = z.infer<typeof GenerateAgriculturalAdviceInputSchema>;

const GenerateAgriculturalAdviceOutputSchema = z.object({
  advice: z.string().describe('The AI-generated agricultural advice.'),
});
export type GenerateAgriculturalAdviceOutput = z.infer<typeof GenerateAgriculturalAdviceOutputSchema>;

export async function generateAgriculturalAdvice(input: GenerateAgriculturalAdviceInput): Promise<GenerateAgriculturalAdviceOutput> {
  return generateAgriculturalAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAgriculturalAdvicePrompt',
  input: {schema: GenerateAgriculturalAdviceInputSchema},
  output: {schema: GenerateAgriculturalAdviceOutputSchema},
  prompt: `You are an expert agricultural advisor. A farmer has asked the following question: {{{query}}}. Provide helpful, context-aware advice to the farmer to help them make informed decisions about their crops.
  {{#if photoDataUri}}
  Analyze the following image as part of your assessment:
  Photo: {{media url=photoDataUri}}
  {{/if}}
  {{#if language}}
  Please provide the answer in the following language: {{{language}}}.
  {{/if}}
  `,
});

const generateAgriculturalAdviceFlow = ai.defineFlow(
  {
    name: 'generateAgriculturalAdviceFlow',
    inputSchema: GenerateAgriculturalAdviceInputSchema,
    outputSchema: GenerateAgriculturalAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
