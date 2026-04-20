'use server';
/**
 * @fileOverview A Genkit flow for summarizing municipality announcements.
 *
 * - summarizeMunicipalityAnnouncement - A function that handles the summarization process.
 * - SummarizeMunicipalityAnnouncementInput - The input type for the summarizeMunicipalityAnnouncement function.
 * - SummarizeMunicipalityAnnouncementOutput - The return type for the summarizeMunicipalityAnnouncement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMunicipalityAnnouncementInputSchema = z.object({
  announcementText: z
    .string()
    .describe('The full text of the municipality announcement to be summarized.'),
});
export type SummarizeMunicipalityAnnouncementInput = z.infer<
  typeof SummarizeMunicipalityAnnouncementInputSchema
>;

const SummarizeMunicipalityAnnouncementOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise, easy-to-read summary of the municipality announcement.'
    ),
});
export type SummarizeMunicipalityAnnouncementOutput = z.infer<
  typeof SummarizeMunicipalityAnnouncementOutputSchema
>;

export async function summarizeMunicipalityAnnouncement(
  input: SummarizeMunicipalityAnnouncementInput
): Promise<SummarizeMunicipalityAnnouncementOutput> {
  return summarizeMunicipalityAnnouncementFlow(input);
}

const summarizeMunicipalityAnnouncementPrompt = ai.definePrompt({
  name: 'summarizeMunicipalityAnnouncementPrompt',
  input: {schema: SummarizeMunicipalityAnnouncementInputSchema},
  output: {schema: SummarizeMunicipalityAnnouncementOutputSchema},
  prompt: `You are a helpful assistant designed to summarize municipality announcements.
Your goal is to provide a concise, easy-to-read summary that captures the main information from the announcement.

Announcement Text: {{{announcementText}}}

Provide a summary in Turkish.`,
});

const summarizeMunicipalityAnnouncementFlow = ai.defineFlow(
  {
    name: 'summarizeMunicipalityAnnouncementFlow',
    inputSchema: SummarizeMunicipalityAnnouncementInputSchema,
    outputSchema: SummarizeMunicipalityAnnouncementOutputSchema,
  },
  async (input) => {
    const {output} = await summarizeMunicipalityAnnouncementPrompt(input);
    return output!;
  }
);
