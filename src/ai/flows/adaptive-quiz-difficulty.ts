'use server';

/**
 * @fileOverview A flow that dynamically adjusts quiz question difficulty based on student performance.
 *
 * - adjustQuizDifficulty - Adjusts the difficulty of quiz questions based on student performance.
 * - AdjustQuizDifficultyInput - The input type for the adjustQuizDifficulty function.
 * - AdjustQuizDifficultyOutput - The return type for the adjustQuizDifficulty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustQuizDifficultyInputSchema = z.object({
  classLevel: z.string().describe('The class level of the students (e.g., 1st-2nd, 3rd-5th).'),
  groupName: z.string().describe('The group name of the students (e.g., Group A, Group B).'),
  averageScore: z
    .number()
    .describe('The average score of the students on the previous quiz questions.'),
  currentQuestion: z.string().describe('The current quiz question being asked.'),
  subject: z.string().describe('The subject of the quiz.'),
});
export type AdjustQuizDifficultyInput = z.infer<typeof AdjustQuizDifficultyInputSchema>;

const AdjustQuizDifficultyOutputSchema = z.object({
  adjustedQuestion: z
    .string()
    .describe('The adjusted quiz question, rephrased based on student performance.'),
  explanation: z
    .string()
    .describe(
      'Explanation of why the question was rephrased and what knowledge domain it now tests.'
    ),
});
export type AdjustQuizDifficultyOutput = z.infer<typeof AdjustQuizDifficultyOutputSchema>;

export async function adjustQuizDifficulty(
  input: AdjustQuizDifficultyInput
): Promise<AdjustQuizDifficultyOutput> {
  return adjustQuizDifficultyFlow(input);
}

const adjustQuizDifficultyPrompt = ai.definePrompt({
  name: 'adjustQuizDifficultyPrompt',
  input: {schema: AdjustQuizDifficultyInputSchema},
  output: {schema: AdjustQuizDifficultyOutputSchema},
  prompt: `You are an expert quiz question writer. You will rephrase the current quiz question based on the student's average score on previous questions to adjust the difficulty.

Class Level: {{{classLevel}}}
Group Name: {{{groupName}}}
Average Score: {{{averageScore}}}
Current Question: {{{currentQuestion}}}
Subject: {{{subject}}}

Rephrase the question to be more appropriate for the students' current skill level. Also, adjust the question such that a more diverse range of knowledge domains is evaluated in future quizzes. Explain why you rephrased the question and what knowledge domain the new question tests in the explanation field.

Output the rephrased question and the explanation in a JSON format.`,
});

const adjustQuizDifficultyFlow = ai.defineFlow(
  {
    name: 'adjustQuizDifficultyFlow',
    inputSchema: AdjustQuizDifficultyInputSchema,
    outputSchema: AdjustQuizDifficultyOutputSchema,
  },
  async input => {
    const {output} = await adjustQuizDifficultyPrompt(input);
    return output!;
  }
);
