import {
  FloatingPortal,
  useFloating,
  useTransitionStyles,
} from '@floating-ui/react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'fail' | 'loading' | 'info';

interface ToastOptions {
  duration?: number;
  icon?: React.ReactNode;
  className?: string;
  mask?: boolean;
}

interface ToastState extends ToastOptions {
  content: React.ReactNode;
  type: ToastType;
  id: number;
}

let toastState: ToastState | null = null;
let listeners: Array<(state: ToastState | null) => void> = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let idCounter = 0;

const notify = () => {
  for (const l of listeners) {
    l(toastState);
  }
};

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

export const toast = {
  show: (
    content: React.ReactNode,
    type: ToastType = 'info',
    options: ToastOptions = {}
  ) => {
    clearTimer();
    const duration = options.duration ?? (type === 'loading' ? 0 : 3000);

    toastState = {
      content,
      type,
      id: ++idCounter,
      ...options,
      duration,
    };
    notify();

    if (duration > 0) {
      timer = setTimeout(() => {
        toast.hide();
      }, duration);
    }
  },
  success: (content: React.ReactNode, options?: ToastOptions) =>
    toast.show(content, 'success', options),
  fail: (content: React.ReactNode, options?: ToastOptions) =>
    toast.show(content, 'fail', options),
  info: (content: React.ReactNode, options?: ToastOptions) =>
    toast.show(content, 'info', options),
  loading: (content: React.ReactNode, options?: ToastOptions) =>
    toast.show(content, 'loading', options),
  hide: () => {
    clearTimer();
    toastState = null;
    notify();
  },
};

export default function ToastContainer() {
  const [state, setState] = useState<ToastState | null>(toastState);

  useEffect(() => {
    const listener = (s: ToastState | null) => setState(s);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const { refs, context } = useFloating({
    open: !!state,
    onOpenChange: (open) => {
      if (!open) toast.hide();
    },
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 300,
    initial: { opacity: 0, transform: 'translate(-50%, -50%)' },
    open: { opacity: 1, transform: 'translate(-50%, -50%)' },
    close: { opacity: 0, transform: 'translate(-50%, -50%)' },
  });

  if (!isMounted) return null;

  return <ToastInner refs={refs} state={state} styles={styles} />;
}

function ToastIcon({
  type,
  icon,
}: {
  type: ToastType;
  icon?: React.ReactNode;
}) {
  if (icon) return <>{icon}</>;
  switch (type) {
    case 'loading':
      return (
        // <Loader2
        //   className="size-10 animate-spin text-white"
        //   strokeWidth={1.5}
        // />
        <svg
          className="animate-spin text-white"
          fill="none"
          height="56"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask fill="white" id="path-1-inside-1_4506_628">
            <path d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24ZM8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8C15.1634 8 8 15.1634 8 24Z" />
          </mask>
          <path
            d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24ZM8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8C15.1634 8 8 15.1634 8 24Z"
            mask="url(#path-1-inside-1_4506_628)"
            stroke="#9B9EA3"
            stroke-opacity="0.08"
            stroke-width="8"
          />
          <mask fill="white" id="path-2-inside-2_4506_628">
            <path d="M27.8232 43.6312C24.3848 44.3008 20.8308 44.0556 17.517 42.9201C14.2032 41.7846 11.2457 39.7987 8.94053 37.161C6.63539 34.5234 5.06345 31.3265 4.38204 27.8905C3.70063 24.4544 3.93365 20.8996 5.05777 17.5819L8.84622 18.8655C7.94692 21.5197 7.7605 24.3635 8.30563 27.1124C8.85076 29.8612 10.1083 32.4187 11.9524 34.5288C13.7965 36.6389 16.1625 38.2277 18.8136 39.1361C21.4647 40.0445 24.3078 40.2406 27.0585 39.7049L27.8232 43.6312Z" />
          </mask>
          <path
            d="M27.8232 43.6312C24.3848 44.3008 20.8308 44.0556 17.517 42.9201C14.2032 41.7846 11.2457 39.7987 8.94053 37.161C6.63539 34.5234 5.06345 31.3265 4.38204 27.8905C3.70063 24.4544 3.93365 20.8996 5.05777 17.5819L8.84622 18.8655C7.94692 21.5197 7.7605 24.3635 8.30563 27.1124C8.85076 29.8612 10.1083 32.4187 11.9524 34.5288C13.7965 36.6389 16.1625 38.2277 18.8136 39.1361C21.4647 40.0445 24.3078 40.2406 27.0585 39.7049L27.8232 43.6312Z"
            mask="url(#path-2-inside-2_4506_628)"
            stroke="white"
            stroke-width="8"
          />
        </svg>
      );
    case 'success':
      return (
        <svg
          height="56"
          viewBox="0 0 56 56"
          width="56"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M11.932 24.2163C9.75946 24.2163 7.99985 22.4625 7.99985 20.3025C7.99985 18.1425 9.75946 16.3903 11.932 16.3903C14.1046 16.3903 15.8646 18.1425 15.8646 20.3025C15.8646 22.4625 14.1046 24.2163 11.932 24.2163ZM42.9883 35.0182C43.8397 35.0182 44.6911 35.3409 45.3405 35.9872C46.6397 37.28 46.6397 39.3764 45.3405 40.6674C35.7436 50.2194 20.1271 50.2194 10.5311 40.6697C9.23224 39.3768 9.23224 37.2812 10.5311 35.9883C11.8299 34.6962 13.9358 34.6962 15.2346 35.9883C22.2385 42.9577 33.6326 42.9577 40.6377 35.9872C41.286 35.3409 42.1373 35.0182 42.9883 35.0182ZM40.0071 20.3025C40.0071 22.4625 41.7667 24.2163 43.9393 24.2163C46.1118 24.2163 47.8718 22.4625 47.8718 20.3025C47.8718 18.1425 46.1118 16.3903 43.9393 16.3903C41.7667 16.3903 40.0071 18.1425 40.0071 20.3025Z"
            fill="white"
            fill-rule="evenodd"
          />
        </svg>
      );
    case 'fail':
      return (
        <svg
          fill="none"
          height="56"
          viewBox="0 0 56 56"
          width="56"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M11.9287 24.1792C9.75823 24.1792 7.99985 22.4356 7.99985 20.2888C7.99985 18.1416 9.75823 16.4 11.9287 16.4C14.0992 16.4 15.858 18.1416 15.858 20.2888C15.858 22.4356 14.0992 24.1792 11.9287 24.1792ZM12.8793 47.6533C12.0288 47.6533 11.1778 47.3325 10.5294 46.6901C9.23118 45.4049 9.23118 43.3213 10.5294 42.0377C20.118 32.5433 35.7213 32.5433 45.3096 42.0357C46.6073 43.3209 46.6073 45.4037 45.3096 46.6889C44.0118 47.9733 41.9075 47.9733 40.6098 46.6889C33.6118 39.7613 22.2271 39.7613 15.2279 46.6901C14.5803 47.3325 13.7294 47.6533 12.8793 47.6533ZM39.9804 20.2888C39.9804 22.4356 41.7388 24.1792 43.9093 24.1792C46.0798 24.1792 47.8386 22.4356 47.8386 20.2888C47.8386 18.1416 46.0798 16.4 43.9093 16.4C41.7388 16.4 39.9804 18.1416 39.9804 20.2888Z"
            fill="white"
            fill-rule="evenodd"
          />
        </svg>
      );
    case 'info':
      return null;
    default:
      return null;
  }
}

function ToastInner({
  state,
  styles,
  refs,
}: {
  state: ToastState | null;
  styles: React.CSSProperties;
  refs: any;
}) {
  const [activeState, setActiveState] = useState(state);

  useEffect(() => {
    if (state) setActiveState(state);
  }, [state]);

  const renderState = state || activeState;
  if (!renderState) return null;

  return (
    <FloatingPortal id="toast-ui">
      {renderState.mask && (
        <div className="fixed inset-0 z-[9999] bg-transparent" />
      )}
      <div
        className={cn(
          'z-[10000]  min-w-[120px] flex flex-col justify-center items-center space-y-2 rounded-lg dark:bg-gray-700/95 bg-black/80 p-4 text-white',
          renderState.className
        )}
        ref={refs.setFloating}
        style={{
          ...styles,
          position: 'fixed',
          top: renderState.type === 'info' ? '30%' : '50%',
          left: '50%',
        }}
      >
        <ToastIcon icon={renderState.icon} type={renderState.type} />
        <div className="whitespace-pre-wrap leading-tight text-center text-base">
          {renderState.content}
        </div>
      </div>
    </FloatingPortal>
  );
}
