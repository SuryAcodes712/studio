'use server';
/**
 * @fileOverview A tool for fetching current market prices for crops.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const getMarketPrices = ai.defineTool(
  {
    name: 'getMarketPrices',
    description: 'Get the current market prices for a list of crops.',
    inputSchema: z.object({
      crops: z
        .array(z.string())
        .describe('The list of crop names to fetch prices for.'),
    }),
    outputSchema: z.object({
      prices: z.array(
        z.object({
          crop: z.string().describe('The name of the crop.'),
          price: z.string().describe('The current market price, including currency.'),
          change: z.string().describe('The price change from the previous day.'),
          location: z.string().describe('The market location for this price.'),
        })
      ),
    }),
  },
  async ({crops}) => {
    console.log(`Fetching market prices for: ${crops.join(', ')}`);
    // In a real application, you would call an external Market Data API here.
    // For this prototype, we'll return mock data.
    const mockPrices = {
      Tomato: { price: '₹2,500/quintal', change: '+2.5%', location: 'Mandasaur' },
      Onion: { price: '₹1,800/quintal', change: '-1.2%', location: 'Neemuch' },
      Wheat: { price: '₹2,100/quintal', change: '+0.5%', location: 'Indore' },
      Soybean: { price: '₹4,500/quintal', change: '+3.1%', location: 'Ujjain' },
    };

    return {
      prices: crops
        .map((crop) => {
            const data = mockPrices[crop as keyof typeof mockPrices];
            return data ? { crop, ...data } : null;
        })
        .filter((p): p is NonNullable<typeof p> => p !== null),
    };
  }
);
