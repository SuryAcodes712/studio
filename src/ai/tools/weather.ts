'use server';
/**
 * @fileOverview A tool for fetching current weather data.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const getWeather = ai.defineTool(
  {
    name: 'getWeather',
    description: 'Get the current weather and a short-term forecast for a given location.',
    inputSchema: z.object({
      location: z.string().describe('The city and state for the weather forecast.'),
    }),
    outputSchema: z.object({
        location: z.string(),
        temperature: z.string(),
        condition: z.enum(['Sunny', 'Cloudy', 'Rainy', 'Windy', 'Stormy']),
        forecast: z.array(
            z.object({
                day: z.string(),
                condition: z.enum(['Sunny', 'Cloudy', 'Rainy', 'Windy', 'Stormy']),
            })
        )
    }),
  },
  async ({location}) => {
    console.log(`Fetching weather for ${location}`);
    // In a real application, you would call an external Weather API here.
    // For this prototype, we'll return mock data.
    return {
      location: "Bhopal, MP",
      temperature: "32°C",
      condition: "Sunny",
      forecast: [
        { day: "Tue", condition: 'Sunny' },
        { day: "Wed", condition: 'Cloudy' },
        { day: "Thu", condition: 'Rainy' },
      ],
    };
  }
);
