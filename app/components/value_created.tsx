import { ReactNode } from "react";

export function BigText({ children }: { children: ReactNode }) {
  return (
    <p className="text-center font-serif text-2xl dark:text-slate-100 lg:text-4xl xl:text-5xl">
      {children}
    </p>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="underline decoration-violet-600 decoration-solid underline-offset-4 transition-colors hover:text-violet-900 dark:hover:text-violet-400">
      {children}
    </span>
  );
}
