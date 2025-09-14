'use server';
import { adjustQuizDifficulty, AdjustQuizDifficultyInput } from '@/ai/flows/adaptive-quiz-difficulty';

export async function getAdjustedQuestion(input: AdjustQuizDifficultyInput) {
    try {
        const result = await adjustQuizDifficulty(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error adjusting quiz difficulty:", error);
        return { success: false, error: "Failed to adjust question." };
    }
}
