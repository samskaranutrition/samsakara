import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ReadAloud } from "./ReadAloud";

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main key={pathname} className="route-transition flex-1">
        {children}
      </main>
      <Footer />
      <ReadAloud />
    </div>
  );
}

