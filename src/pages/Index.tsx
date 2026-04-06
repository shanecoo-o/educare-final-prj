import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Index = () => {
  // Redirect-style: just render landing
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center animate-fade-in">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
          <GraduationCap className="h-7 w-7 text-primary-foreground" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-foreground">EDUCORE</h1>
        <p className="mt-2 text-sm text-muted-foreground">Redirecting...</p>
        <Link to="/" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default Index;
