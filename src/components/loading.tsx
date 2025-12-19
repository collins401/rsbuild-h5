import { Spinner } from './ui/spinner';

interface LoadingProps {
  className?: string;
}
export function Loading(props: LoadingProps) {
  const { className } = props;
  return (
    <div className="text-center py-4">
      <Spinner className={`text-primary ${className}`} />
    </div>
  );
}
