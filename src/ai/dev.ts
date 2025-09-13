import { config } from 'dotenv';
config();

import '@/ai/flows/generate-agricultural-advice.ts';
import '@/ai/flows/diagnose-plant-health-from-image.ts';