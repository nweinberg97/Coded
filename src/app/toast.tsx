import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

export type Toast = { id: number; kind: 'xp' | 'info' | 'error' | 'success'; title: string; body?: string };

type ToastApi = { push: (t: Omit<Toast, 'id'>) => void };

const ToastCtx = createContext<ToastApi>({ push: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);
  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const id = nextId.current++;
    setToasts((all) => [...all.slice(-3), { ...t, id }]);
    setTimeout(() => setToasts((all) => all.filter((x) => x.id !== id)), t.kind === 'error' ? 7000 : 3200);
  }, []);
  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.kind}`}>
            {t.kind === 'xp' ? <span className="toast-amt">{t.title}</span> : <strong>{t.title}</strong>}
            {t.body && <span className="toast-body">{t.body}</span>}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
