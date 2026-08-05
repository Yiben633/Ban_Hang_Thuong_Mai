import { cn } from './cn.js';

const variants = {
  default: 'border-transparent bg-accent text-accent-foreground',
  success: 'border-border bg-neutral-100 text-foreground',
  warning: 'border-border bg-neutral-200 text-foreground',
  danger: 'border-transparent bg-danger text-danger-foreground',
  neutral: 'border-border bg-surface text-muted',
};

function Badge({ children, className, variant = 'default', ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variants[variant] || variants.default,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
