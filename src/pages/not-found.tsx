import { Home, TentTree } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="zoom-in-50 flex h-24 w-24 animate-in items-center justify-center rounded-full bg-muted duration-500">
        <TentTree className="h-12 w-12 text-muted-foreground" />
      </div>

      <div className="slide-in-from-bottom-5 animate-in space-y-2 fill-mode-backwards delay-150 duration-500">
        <h1 className="font-bold text-4xl tracking-tighter sm:text-5xl">404</h1>
        <p className="font-medium text-muted-foreground text-xl">
          Page not found
        </p>
        <p className="max-w-[400px] text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have
          been removed, renamed, or doesn't exist.
        </p>
      </div>

      <div className="slide-in-from-bottom-5 animate-in fill-mode-backwards delay-300 duration-500">
        <Button className="gap-2" onClick={() => setLocation('/')} size="lg">
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
