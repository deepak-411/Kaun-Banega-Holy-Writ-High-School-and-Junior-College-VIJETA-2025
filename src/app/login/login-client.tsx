"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { KeyRound, LogIn } from 'lucide-react';

export default function LoginClient() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();
  const logoImage = PlaceHolderImages.find(img => img.id === 'school-logo');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '123') {
      try {
        localStorage.setItem('isTeacherLoggedIn', 'true');
        toast({
          title: "Login Successful",
          description: "Redirecting to dashboard...",
        });
        router.push('/dashboard');
      } catch (e) {
        setError("Could not log in. Please enable local storage in your browser.");
      }
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
  };

  return (
    <Card className="relative z-20 w-full max-w-sm bg-background/90 backdrop-blur-sm shadow-2xl animate-fade-in-up">
      <CardHeader className="text-center items-center space-y-2">
        {logoImage && (
          <Image
            src={logoImage.imageUrl}
            alt={logoImage.description}
            width={80}
            height={80}
            data-ai-hint={logoImage.imageHint}
          />
        )}
        <CardTitle className="text-2xl font-headline text-primary">
          Teacher Login
        </CardTitle>
        <CardDescription>
          Enter the password to access the quiz dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if(error) setError('');
                }}
                placeholder="••••••••"
                required
                className="pl-10"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            <LogIn className="mr-2 h-5 w-5" />
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
