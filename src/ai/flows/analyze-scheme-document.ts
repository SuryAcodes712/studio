'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing a government scheme document and answering questions about it.
 *
 * It includes:
 * - analyzeSchemeDocument: A function to handle the analysis.
 * - AnalyzeSchemeDocumentInput: The input type for the function.
 * - AnalyzeSchemeDocumentOutput: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSchemeDocumentInputSchema = z.object({
  documentContent: z.string().describe('The text content of the scheme document.'),
  query: z.string().describe('The user\'s question about the document.'),
});
export type AnalyzeSchemeDocumentInput = z.infer<typeof AnalyzeSchemeDocumentInputSchema>;

const AnalyzeSchemeDocumentOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the query based on the document.'),
});
export type AnalyzeSchemeDocumentOutput = z.infer<typeof AnalyzeSchemeDocumentOutputSchema>;

export async function analyzeSchemeDocument(input: AnalyzeSchemeDocumentInput): Promise<AnalyzeSchemeDocumentOutput> {
  return analyzeSchemeDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSchemeDocumentPrompt',
  input: {schema: AnalyzeSchemeDocumentInputSchema},
  output: {schema: AnalyzeSchemeDocumentOutputSchema},
  prompt: `You are an expert at analyzing government documents and explaining them to farmers.
  
  A farmer has uploaded the following document and has a question. Your task is to answer the question based *only* on the content of the document provided. Do not use any external knowledge.

  Document Content:
  ---
  {{{documentContent}}}
  ---
  
  Farmer's Question: "{{{query}}}"
  
  Please provide a clear and concise answer.`,
});

const analyzeSchemeDocumentFlow = ai.defineFlow(
  {
    name: 'analyzeSchemeDocumentFlow',
    inputSchema: AnalyzeSchemeDocumentInputSchema,
    outputSchema: AnalyzeSchemeDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
