/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from 'react';
import { cn } from '../components/ui/cn.js';

const ToastContext = createContext(null);
const TOAST_DURATION = 3000;
const TOAST_TYPES = ['success', 'error', 'warning', 'info'];

const toastStyles = {
  success: 'border-border bg-surface text-foreground',
  error: 'border-danger bg-danger text-danger-foreground',
  warning: 'border-neutral-400 bg-neutral-100 text-foreground',
  info: 'border-border bg-neutral-50 text-foreground',
};

function getToastOptions(typeOrOptions) {
  if (typeof typeOrOptions === 'string') {
    return { type: typeOrOptions };
  }
  return typeOrOptions || {};
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const showToast = useCallback(
    (message, typeOrOptions = 'success') => {
      const options = getToastOptions(typeOrOptions);
      const type = TOAST_TYPES.includes(options.type)
        ? options.type
        : 'success';
      const duration = Number(options.duration) || TOAST_DURATION;
      const id = `${Date.now()}-${Math.random()}`;

      setToasts((currentToasts) => [...currentToasts, { id, message, type }]);
      window.setTimeout(() => dismissToast(id), duration);
      return id;
    },
    [dismissToast],
  );

  const value = { showToast, dismissToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-end gap-2 sm:left-auto sm:max-w-sm"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role={toast.type === 'error' ? 'alert' : 'status'}
            className={cn(
              'toast-enter pointer-events-auto flex w-full items-center justify-between gap-4 rounded-md border px-4 py-3 text-sm shadow-panel sm:w-auto sm:min-w-72',
              toastStyles[toast.type],
            )}
          >
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Đóng thông báo"
              className="shrink-0 text-current opacity-70 hover:opacity-100 focus-visible:outline-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider.');
  return context;
}
