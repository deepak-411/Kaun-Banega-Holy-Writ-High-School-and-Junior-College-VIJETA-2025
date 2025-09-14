import { QuizClient } from "@/components/quiz-client";
import { AppHeader } from "@/components/app-header";

type QuizPageProps = {
  params: {
    classLevel: string;
    group: string;
  };
};

export default function QuizPage({ params }: QuizPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="pt-24 p-4 md:p-8 flex items-center justify-center">
        <QuizClient classLevel={params.classLevel} group={params.group} />
      </main>
    </div>
  );
}
