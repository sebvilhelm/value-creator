import { ReactNode } from "react";

export function BigText({ children }: { children: ReactNode }) {
  return (
    <p className="text-2xl lg:text-4xl xl:text-5xl font-serif text-center dark:text-slate-100">
      {children}
    </p>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="underline underline-offset-4 decoration-solid decoration-violet-600 transition-colors hover:text-violet-900 dark:hover:text-violet-400">
      {children}
    </span>
  );
}
