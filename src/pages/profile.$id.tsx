import { useParams } from 'wouter';

export default function TodoPage() {
  const { id } = useParams();
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-bold text-3xl tracking-tighter sm:text-4xl">
        profile id--{id}
      </h1>
    </div>
  );
}
