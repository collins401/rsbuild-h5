import { Link } from 'wouter';
import { Loading } from '@/components/loading';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <div className="">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <Input className="mt-4 w-64" placeholder="Type something..." />
      <Checkbox />
      <Link href="/todo">to todo</Link>
      <Loading className="text-red-500" />
    </div>
  );
}
