import { cn } from './cn.js';

function Spinner({ className, label = 'Đang tải', size = 'md' }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-[3px]',
  };

  return (
    <span
      aria-label={label}
      role="status"
      className={cn(
        'inline-block animate-spin rounded-full border-border border-t-foreground',
        sizes[size] || sizes.md,
        className,
      )}
    />
  );
}

export default Spinner;
