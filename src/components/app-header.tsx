'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { LogOut, Home } from 'lucide-react';

export function AppHeader() {
  const router = useRouter();
  const logoImage = PlaceHolderImages.find(img => img.id === 'school-logo');
  
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isTeacherLoggedIn');
      router.push('/login');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 p-3 bg-background/80 backdrop-blur-sm border-b z-30">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {logoImage && (
            <Image
              src={logoImage.imageUrl}
              alt={logoImage.description}
              width={48}
              height={48}
              data-ai-hint={logoImage.imageHint}
            />
          )}
          <h1 className="text-lg md:text-xl font-headline font-bold text-primary hidden sm:block">
            HW Quiz Champion Dashboard
          </h1>
        </Link>
        <div className="flex items-center gap-2">
            <Link href="/">
                <Button variant="ghost" size="icon" aria-label="Home">
                    <Home className="h-5 w-5"/>
                </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
                <LogOut className="h-5 w-5 text-destructive"/>
            </Button>
        </div>
      </div>
    </header>
  );
}
