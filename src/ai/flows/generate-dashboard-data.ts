'use server';
/**
 * @fileOverview A flow for generating all dynamic data needed for the user dashboard.
 *
 * - generateDashboardData - A function that fetches weather and market prices.
 * - GenerateDashboardDataOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {getWeather} from '../tools/weather';
import {getMarketPrices} from '../tools/market';

const GenerateDashboardDataOutputSchema = z.object({
  weather: getWeather.outputSchema,
  marketPrices: getMarketPrices.outputSchema,
});
export type GenerateDashboardDataOutput = z.infer<
  typeof GenerateDashboardDataOutputSchema
>;

export async function generateDashboardData(): Promise<GenerateDashboardDataOutput> {
  return generateDashboardDataFlow();
}

const generateDashboardDataFlow = ai.defineFlow(
  {
    name: 'generateDashboardDataFlow',
    inputSchema: z.void(),
    outputSchema: GenerateDashboardDataOutputSchema,
  },
  async () => {
    // In a real app, location and crops would be dynamic based on user settings
    const location = 'Bhopal, MP';
    const crops = ['Tomato', 'Onion', 'Wheat', 'Soybean'];

    const [weather, marketPrices] = await Promise.all([
      getWeather({location}),
      getMarketPrices({crops}),
    ]);

    return {
      weather,
      marketPrices,
    };
  }
);
