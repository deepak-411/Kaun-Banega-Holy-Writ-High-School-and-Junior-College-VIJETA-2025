"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { CLASS_LEVELS, GROUPS } from '@/lib/constants';
import { Rocket, Trophy, Users, BookOpen } from 'lucide-react';

type QuizResult = {
  classLevel: string;
  group: string;
  score: number;
  total: number;
  date: string;
};

export default function DashboardClient() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const isLoggedIn = localStorage.getItem('isTeacherLoggedIn');
    if (isLoggedIn !== 'true') {
      router.replace('/login');
    } else {
      // Load results from localStorage
      const savedResults: QuizResult[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('quizResult-')) {
          const item = localStorage.getItem(key);
          if (item) {
            savedResults.push(JSON.parse(item));
          }
        }
      }
      setResults(savedResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
  }, [router]);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  const handleStartQuiz = () => {
    if (selectedClass && selectedGroup) {
      router.push(`/quiz/${selectedClass}/${selectedGroup}`);
    }
  };

  const getClassName = (value: string) => CLASS_LEVELS.find(c => c.value === value)?.label;
  const getGroupName = (value:string) => GROUPS.find(g => g.value === value)?.label;

  return (
    <div className="container mx-auto space-y-8">
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl font-headline text-primary">
            <Rocket className="h-8 w-8" />
            Start a New Quiz
          </CardTitle>
          <CardDescription>Select a class and group to begin the quiz.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-medium flex items-center gap-2 text-muted-foreground"><BookOpen className="h-4 w-4"/>Class Level</label>
            <Select onValueChange={setSelectedClass} value={selectedClass}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a class level" />
              </SelectTrigger>
              <SelectContent>
                {CLASS_LEVELS.map(c => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="font-medium flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4"/>Group</label>
            <Select onValueChange={setSelectedGroup} value={selectedGroup}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                {GROUPS.map(g => (
                  <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleStartQuiz} disabled={!selectedClass || !selectedGroup} size="lg">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl font-headline text-primary">
            <Trophy className="h-8 w-8" />
            Quiz Results
          </CardTitle>
          <CardDescription>Scores from completed quiz sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            {results.length === 0 && <TableCaption>No quiz results yet.</TableCaption>}
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Class Level</TableHead>
                <TableHead>Group</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(result.date).toLocaleString()}</TableCell>
                  <TableCell>{getClassName(result.classLevel)}</TableCell>
                  <TableCell>{getGroupName(result.group)}</TableCell>
                  <TableCell className="text-right font-medium">{result.score} / {result.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
