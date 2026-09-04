import { ReactNode } from "react";

export function TableHeading({ children, alignRight = false }: { children: ReactNode; alignRight?: boolean }) {
  return (
    <th
      scope="col"
      className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 xl:px-6 ${alignRight ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}
