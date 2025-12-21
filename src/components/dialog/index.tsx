import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type DialogType = 'info' | 'confirm' | 'alert';

interface DialogOptions {
  title?: React.ReactNode;
  content?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  showCancelButton?: boolean;
  showOkButton?: boolean;
  className?: string;
  maskClosable?: boolean;
  closeOnOk?: boolean;
}

interface DialogState extends DialogOptions {
  type: DialogType;
  id: number;
}

let dialogState: DialogState | null = null;
let listeners: Array<(state: DialogState | null) => void> = [];
let idCounter = 0;

const notify = () => {
  for (const l of listeners) {
    l(dialogState);
  }
};

export const dialog = {
  show: (type: DialogType, options: DialogOptions) => {
    dialogState = {
      type,
      id: ++idCounter,
      showCancelButton: type === 'confirm',
      showOkButton: true,
      okText: '确定',
      cancelText: '取消',
      maskClosable: type !== 'confirm',
      closeOnOk: true,
      ...options,
    };
    notify();

    return new Promise<boolean>((resolve) => {
      const originalOnOk = dialogState?.onOk;
      const originalOnCancel = dialogState?.onCancel;

      if (dialogState) {
        dialogState.onOk = async () => {
          try {
            await originalOnOk?.();
            resolve(true);
          } catch (error) {
            console.error('Dialog onOk error:', error);
            resolve(false);
          }
        };

        dialogState.onCancel = () => {
          originalOnCancel?.();
          resolve(false);
        };
      }
    });
  },

  info: (options: DialogOptions) => dialog.show('info', options),

  confirm: (options: DialogOptions) => dialog.show('confirm', options),

  alert: (options: DialogOptions) =>
    dialog.show('alert', {
      ...options,
      showCancelButton: false,
    }),

  hide: () => {
    dialogState = null;
    notify();
  },
};

export default function DialogContainer() {
  const [state, setState] = useState<DialogState | null>(dialogState);

  useEffect(() => {
    const listener = (s: DialogState | null) => setState(s);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const { refs, context } = useFloating({
    open: !!state,
    onOpenChange: (open) => {
      if (!open) {
        state?.onCancel?.();
        dialog.hide();
      }
    },
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    enabled: state?.maskClosable ?? true,
  });
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([click, dismiss, role]);

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 200,
    initial: { opacity: 0, transform: 'scale(0.95)' },
    open: { opacity: 1, transform: 'scale(1)' },
    close: { opacity: 0, transform: 'scale(0.95)' },
  });

  if (!isMounted) return null;

  return (
    <DialogInner
      context={context}
      getFloatingProps={getFloatingProps}
      refs={refs}
      state={state}
      styles={styles}
    />
  );
}

function DialogInner({
  state,
  styles,
  refs,
  context,
  getFloatingProps,
}: {
  state: DialogState | null;
  styles: React.CSSProperties;
  refs: any;
  context: any;
  getFloatingProps: any;
}) {
  const [activeState, setActiveState] = useState(state);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state) {
      setActiveState(state);
      setLoading(false);
    }
  }, [state]);

  const renderState = state || activeState;
  if (!renderState) return null;

  const handleOk = async () => {
    if (loading) return;

    try {
      setLoading(true);
      if (renderState.closeOnOk) {
        dialog.hide();
      }
      await renderState.onOk?.();
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (loading) return;
    dialog.hide();
    renderState.onCancel?.();
  };

  return (
    <FloatingPortal id="dialog-ui">
      <FloatingOverlay
        className="z-[9999] bg-black/50"
        lockScroll
        style={{ display: 'grid', placeItems: 'center' }}
      >
        <FloatingFocusManager context={context}>
          <div
            className={cn(
              'w-[calc(100vw-2rem)] max-w-md rounded-xl bg-background shadow-lg',
              renderState.className
            )}
            ref={refs.setFloating}
            style={styles}
            {...getFloatingProps()}
          >
            {renderState.title && (
              <div
                className={`px-6 pt-4 text-center ${renderState.content ? '' : 'pb-4'}`}
              >
                <h2 className="text-base font-semibold leading-none">
                  {renderState.title}
                </h2>
              </div>
            )}

            {renderState.content && (
              <div className="px-6 py-5 text-sm text-center text-muted-foreground">
                {renderState.content}
              </div>
            )}

            <div className="flex border-t sm:flex-row sm:justify-end">
              {renderState.showCancelButton && (
                <>
                  <Button
                    className="flex-1 h-11 text-muted-foreground"
                    disabled={loading}
                    onClick={handleCancel}
                    size="lg"
                    type="button"
                    variant="link"
                  >
                    {renderState.cancelText}
                  </Button>
                  <div className="w-[1px] bg-border" />
                </>
              )}

              {renderState.showOkButton && (
                <Button
                  className="flex-1 h-11 "
                  disabled={loading}
                  onClick={handleOk}
                  size="lg"
                  type="button"
                  variant="link"
                >
                  {loading ? '处理中...' : renderState.okText}
                </Button>
              )}
            </div>
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
}
