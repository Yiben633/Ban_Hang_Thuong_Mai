import { cn } from './cn.js';

function ErrorState({ message, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        className,
      )}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-danger-subtle text-sm font-semibold text-danger">
        !
      </div>
      <p className="max-w-sm text-sm text-danger">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default ErrorState;
