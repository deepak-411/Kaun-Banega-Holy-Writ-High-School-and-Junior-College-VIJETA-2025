import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import LoginClient from './login-client';

export default function LoginPage() {
  const bgImage = PlaceHolderImages.find(img => img.id === 'school-background');

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
      <LoginClient />
    </main>
  );
}
