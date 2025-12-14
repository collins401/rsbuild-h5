import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <Input className="mt-4 w-64" placeholder="Type something..." />
      <Checkbox />
    </div>
  );
}
