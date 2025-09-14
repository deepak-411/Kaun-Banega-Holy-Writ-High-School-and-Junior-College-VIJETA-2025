"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { quizData, Question } from '@/lib/quiz-data';
import { CLASS_LEVELS, GROUPS } from '@/lib/constants';
import { useSpeechSynthesis } from '@/hooks/use-speech-synthesis';
import { getAdjustedQuestion } from '@/app/actions';
import { CheckCircle2, XCircle, Wand2, Loader2, Home, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type QuizClientProps = {
  classLevel: string;
  group: string;
};

export function QuizClient({ classLevel, group }: QuizClientProps) {
  const router = useRouter();
  const { speak } = useSpeechSynthesis();
  const { toast } = useToast();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [aiSuggestion, setAiSuggestion] = useState<{ adjustedQuestion: string, explanation: string } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiDialog, setShowAiDialog] = useState(false);

  const className = useMemo(() => CLASS_LEVELS.find(c => c.value === classLevel)?.label, [classLevel]);
  const groupName = useMemo(() => GROUPS.find(g => g.value === group)?.label, [group]);
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);

  useEffect(() => {
    setIsMounted(true);
    const isLoggedIn = localStorage.getItem('isTeacherLoggedIn');
    if (isLoggedIn !== 'true') {
      router.replace('/login');
      return;
    }
    
    const relevantQuestions = quizData[classLevel] || [];
    setQuestions(relevantQuestions);

    const introSound = "अब ध्यान दीजिए, पहला प्रश्न यह रहा आपकी स्क्रीन पर।";
    speak(introSound);
  }, [classLevel, router, speak]);

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;
    setIsAnswered(true);
    if (selectedAnswer === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const result = { classLevel, group, score, total: questions.length, date: new Date().toISOString() };
      localStorage.setItem(`quizResult-${Date.now()}`, JSON.stringify(result));
    }
  };

  const handleAiAdjust = async () => {
    setIsAiLoading(true);
    const averageScore = currentQuestionIndex > 0 ? score / currentQuestionIndex : 0;
    const result = await getAdjustedQuestion({
      classLevel: className || classLevel,
      groupName: groupName || group,
      averageScore: averageScore,
      currentQuestion: currentQuestion.question,
      subject: currentQuestion.subject,
    });
    setIsAiLoading(false);

    if (result.success && result.data) {
      setAiSuggestion(result.data);
      setShowAiDialog(true);
    } else {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: result.error || "Could not get a suggestion from the AI.",
      });
    }
  };

  if (!isMounted || questions.length === 0) {
    return (
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle>Loading Quiz...</CardTitle>
        </CardHeader>
        <CardContent>
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (quizFinished) {
    return (
      <Card className="w-full max-w-2xl text-center animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Quiz Complete!</CardTitle>
          <CardDescription>{className} - {groupName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-5xl font-bold text-primary">{score} / {questions.length}</p>
          <p className="text-lg text-muted-foreground">You have successfully completed the quiz.</p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={() => router.push('/dashboard')}>
            <Home className="mr-2 h-4 w-4" /> Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl animate-fade-in-up shadow-xl">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-headline text-primary">{className}</CardTitle>
            <CardDescription>{groupName}</CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg">Score: {score}</Badge>
        </div>
        <div className="pt-4 space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground text-center">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-xl md:text-2xl font-semibold text-center font-body min-h-[6rem]">
          {currentQuestion.question}
        </p>
        <RadioGroup
          value={selectedAnswer || ''}
          onValueChange={setSelectedAnswer}
          disabled={isAnswered}
          className="space-y-3"
        >
          {currentQuestion.options.map((option, index) => {
            const isCorrect = option === currentQuestion.answer;
            const isSelected = option === selectedAnswer;
            let itemClass = "";
            if (isAnswered) {
              if (isCorrect) itemClass = "bg-green-100 border-green-400 text-green-900";
              else if (isSelected) itemClass = "bg-red-100 border-red-400 text-red-900";
            }
            return (
              <Label key={index} className={`flex items-center gap-4 p-4 border rounded-lg transition-all ${itemClass} ${!isAnswered ? 'cursor-pointer hover:bg-muted/50' : 'cursor-default'}`}>
                <RadioGroupItem value={option} id={`option-${index}`} />
                <span className="flex-1 text-lg">{option}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="text-green-600"/>}
                {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-600"/>}
              </Label>
            )
          })}
        </RadioGroup>
        
        {isAnswered && (
            <Alert variant={selectedAnswer === currentQuestion.answer ? "default" : "destructive"} className={selectedAnswer === currentQuestion.answer ? 'border-green-500' : 'border-red-500'}>
              <AlertTitle>{selectedAnswer === currentQuestion.answer ? "Correct!" : "Incorrect!"}</AlertTitle>
              <AlertDescription>
                The correct answer is: <strong>{currentQuestion.answer}</strong>
              </AlertDescription>
            </Alert>
        )}

      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
        <Button variant="outline" onClick={handleAiAdjust} disabled={isAiLoading || isAnswered}>
          {isAiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Wand2 className="mr-2 h-4 w-4" />}
          Adjust Difficulty (AI)
        </Button>
        {isAnswered ? (
          <Button onClick={handleNextQuestion} size="lg">
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        ) : (
          <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer} size="lg">
            Submit Answer
          </Button>
        )}
      </CardFooter>

      <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-headline">
              <Wand2 className="h-6 w-6 text-primary"/> AI Suggestion
            </DialogTitle>
            <DialogDescription>
              Here is an adjusted version of the question based on performance.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">Adjusted Question</h4>
              <p className="p-4 bg-muted rounded-md border">{aiSuggestion?.adjustedQuestion}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">Explanation</h4>
              <p className="p-4 bg-muted rounded-md border text-sm">{aiSuggestion?.explanation}</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowAiDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
