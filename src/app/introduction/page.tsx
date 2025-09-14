"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useSpeechSynthesis } from '@/hooks/use-speech-synthesis';
import { ListChecks, UserCog } from 'lucide-react';

export default function IntroductionPage() {
  const bgImage = PlaceHolderImages.find(img => img.id === 'school-background');
  const logoImage = PlaceHolderImages.find(img => img.id === 'school-logo');
  const { speak } = useSpeechSynthesis();

  const welcomeAudio = "आप सभी टीचर, स्टूडेंट, और यहाँ मौजूद सम्मानित गुरुजनों का कौन बनेगा होली रिट हाई स्कूल एंड जूनियर कॉलेज विजेता 2025 में स्वागत है।";
  const welcomeText = "नमस्कार! हमारे आदरणीय प्रिंसिपल महोदय/ वाइस प्रिंसिपल महोदय, सभी कोऑर्डिनेटर्स, सम्मानित शिक्षकों और मेरे प्रिय मित्रों, आप सभी का मैं हार्दिक स्वागत करती हूँ।";

  useEffect(() => {
    const timer = setTimeout(() => {
      speak(welcomeAudio);
    }, 1000);
    return () => clearTimeout(timer);
  }, [speak]);

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover z-0"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/80 z-10"></div>
      
      <Card className="relative z-20 w-full max-w-4xl bg-background/90 backdrop-blur-sm shadow-2xl animate-fade-in-up">
        <CardHeader className="text-center items-center space-y-4">
          {logoImage && (
            <Image
              src={logoImage.imageUrl}
              alt={logoImage.description}
              width={100}
              height={100}
              data-ai-hint={logoImage.imageHint}
            />
          )}
          <CardTitle className="text-3xl md:text-4xl font-headline text-primary">
            KAUN BANEGA HOLY WRIT HIGH SCHOOL AND JUNIOR COLLEGE VIJETA 2025
          </CardTitle>
          <p className="text-muted-foreground font-body text-lg">{welcomeText}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-2xl font-headline font-bold text-accent">
              <ListChecks className="h-6 w-6" />
              नियम
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground font-body text-base">
              <li>प्रत्येक प्रश्न बहुविकल्पीय (MCQ) होगा।</li>
              <li>हर प्रश्न का केवल एक सही उत्तर होगा।</li>
              <li>सही उत्तर देने पर एक अंक मिलेगा।</li>
              <li>प्रश्न अलग-अलग आधारों पर होंगे – चित्र आधारित, श्रवण आधारित, वाचन आधारित, व्याकरण आधारित और सामान्य ज्ञान आधारित।</li>
              <li>उत्तर देने से पहले विद्यार्थी को हाथ उठाना होगा।</li>
              <li>प्रश्नों को क्रमशः कक्षा 1-2, 3-5, 6-8, और 9-12 के अनुसार विभाजित किया गया है।</li>
            </ul>
          </div>
          <div className="text-center pt-4">
            <Link href="/login">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <UserCog className="mr-2 h-5 w-5"/>
                Proceed to Teacher Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
