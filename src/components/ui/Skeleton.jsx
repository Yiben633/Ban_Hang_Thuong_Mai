import { cn } from './cn.js';

function Skeleton({ className, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-md bg-neutral-200', className)}
      {...props}
    />
  );
}

export default Skeleton;
