import { cn } from '@/lib/utils';

interface SpinnerProps {
  className?: string;
  size?: number | string;
}
export function Spinner({ className, size = '26' }: SpinnerProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center text-muted-foreground',
        className
      )}
    >
      <svg
        className={'inline-block'}
        height={size}
        viewBox="0 0 80 80"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <rect fill="currentColor" height="8" rx="2" width="8" x="20" y="16">
            <animate
              attributeName="y"
              begin="0s"
              dur="2s"
              from="16"
              keyTimes="0; 0.1; 0.3; 0.4; 1"
              repeatCount="indefinite"
              to="16"
              values="16; 6; 26; 16; 16"
            />
          </rect>
          <rect fill="currentColor" height="8" rx="2" width="8" x="46" y="16">
            <animate
              attributeName="y"
              begin="0.2s"
              dur="2s"
              from="16"
              keyTimes="0; 0.1; 0.3; 0.4; 1"
              repeatCount="indefinite"
              to="16"
              values="16; 6; 26; 16; 16"
            />
          </rect>
          <rect fill="currentColor" height="8" rx="2" width="8" x="72" y="16">
            <animate
              attributeName="y"
              begin="0.4s"
              dur="2s"
              from="16"
              keyTimes="0; 0.1; 0.3; 0.4; 1"
              repeatCount="indefinite"
              to="16"
              values="16; 6; 26; 16; 16"
            />
          </rect>
        </g>
      </svg>
    </div>
  );
}
