/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from 'react';
import { cn } from '../components/ui/cn.js';

const ToastContext = createContext(null);

const toastStyles = {
  success: 'border-border bg-surface text-foreground',
  error: 'border-danger bg-danger text-danger-foreground',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const showToast = useCallback(
    (message, { type = 'success', duration = 3000 } = {}) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((currentToasts) => [...currentToasts, { id, message, type }]);
      window.setTimeout(() => dismissToast(id), duration);
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
              'pointer-events-auto flex w-full items-center justify-between gap-4 rounded-md border px-4 py-3 text-sm shadow-panel sm:w-auto sm:min-w-72',
              toastStyles[toast.type] || toastStyles.success,
            )}
          >
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Đóng thông báo"
              className="shrink-0 text-current opacity-70 hover:opacity-100"
            >
              x
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
