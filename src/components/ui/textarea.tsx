import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.ComponentProps<'textarea'> {
  showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      showCount,
      maxLength = 100,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? ''
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const currentLength = String(currentValue || '').length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            'flex min-h-16 w-full caret-primary rounded-md border border-input bg-background px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30',
            showCount && 'pb-6',
            className
          )}
          data-slot="textarea"
          maxLength={maxLength}
          onChange={handleChange}
          ref={ref}
          value={currentValue}
          {...props}
        />
        {showCount && (
          <div
            className={`absolute bottom-1 right-2 text-xs text-muted-foreground pointer-events-none select-none ${currentLength && 'text-primary'}`}
          >
            {currentLength}
            {maxLength ? ` / ${maxLength}` : ''}
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
