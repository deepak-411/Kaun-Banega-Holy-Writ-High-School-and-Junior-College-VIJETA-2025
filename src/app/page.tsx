"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useSpeechSynthesis } from '@/hooks/use-speech-synthesis';
import { ArrowRight } from 'lucide-react';

export default function WelcomePage() {
  const bgImage = PlaceHolderImages.find(img => img.id === 'school-background');
  const logoImage = PlaceHolderImages.find(img => img.id === 'school-logo');
  const { speak } = useSpeechSynthesis();

  const welcomeText = "Welcome to Holy Writ High School and Junior College";

  useEffect(() => {
    // Let the animation play out a bit before speaking
    const timer = setTimeout(() => {
      speak(welcomeText);
    }, 1000);
    return () => clearTimeout(timer);
  }, [speak]);

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          priority
          className="object-cover z-0"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/70 z-10"></div>
      
      <div className="relative z-20 flex flex-col items-center p-4 space-y-8 animate-fade-in-up">
        {logoImage && (
          <Image
            src={logoImage.imageUrl}
            alt={logoImage.description}
            width={150}
            height={150}
            priority
            className="drop-shadow-2xl"
            data-ai-hint={logoImage.imageHint}
          />
        )}
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
            {welcomeText}
          </h1>
          <p className="text-lg md:text-2xl font-body text-primary-foreground/80 drop-shadow-md">
            Kaun Banega VIJETA 2025
          </p>
        </div>
        
        <Link href="/introduction">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
            Enter <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
