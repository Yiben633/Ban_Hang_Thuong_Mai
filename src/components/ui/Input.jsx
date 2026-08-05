import { forwardRef, useId } from 'react';
import { cn } from './cn.js';

const Input = forwardRef(function Input(
  { className, label, helperText, error, id, disabled, rightElement, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <div className={rightElement ? 'relative' : undefined}>
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={
            error ? errorId : helperText ? descriptionId : undefined
          }
          className={cn(
            'block min-h-10 w-full rounded-md border bg-surface px-3 py-2 text-sm text-foreground shadow-subtle transition placeholder:text-muted',
            'focus:border-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background',
            'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-muted',
            error ? 'border-danger' : 'border-border',
            rightElement && 'pr-10',
            className,
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-1">
            {rightElement}
          </div>
        )}
      </div>
      {error ? (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      ) : (
        helperText && (
          <p id={descriptionId} className="text-sm text-muted">
            {helperText}
          </p>
        )
      )}
    </div>
  );
});

export default Input;
