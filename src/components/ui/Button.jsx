import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from './cn.js';
import Spinner from './Spinner.jsx';

const variants = {
  primary:
    'bg-accent text-accent-foreground hover:bg-accent-hover focus-visible:ring-accent',
  secondary:
    'bg-neutral-100 text-foreground hover:bg-neutral-200 focus-visible:ring-accent',
  outline:
    'border border-border bg-surface text-foreground hover:bg-neutral-50 focus-visible:ring-accent',
  ghost: 'text-foreground hover:bg-neutral-100 focus-visible:ring-accent',
  danger:
    'bg-danger text-danger-foreground hover:bg-neutral-700 focus-visible:ring-danger',
};

const Button = forwardRef(function Button(
  {
    children,
    className,
    disabled,
    loading = false,
    variant = 'primary',
    leftIcon,
    rightIcon,
    type = 'button',
    as = 'button',
    to,
    ...props
  },
  ref,
) {
  const Component = as === 'link' ? Link : 'button';

  return (
    <Component
      ref={ref}
      {...(as === 'link' ? { to } : { type, disabled: disabled || loading })}
      aria-busy={loading || undefined}
      aria-disabled={as === 'link' && (disabled || loading) ? true : undefined}
      className={cn(
        'inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant] || variants.primary,
        className,
      )}
      {...props}
    >
      {loading ? <Spinner size="sm" label="Đang xử lý" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </Component>
  );
});

export default Button;
