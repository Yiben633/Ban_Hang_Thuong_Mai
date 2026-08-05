import { useEffect, useId } from 'react';
import { cn } from './cn.js';

function Modal({ open, onClose, title, children, className }) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          'w-full max-w-lg rounded-lg border border-border bg-surface shadow-panel',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-6">
          {title && (
            <h2 id={titleId} className="text-lg font-semibold text-foreground">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Dong cua so"
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-lg text-muted transition hover:bg-neutral-100 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            x
          </button>
        </div>
        <div className="p-6">{children}</div>
      </section>
    </div>
  );
}

export default Modal;
