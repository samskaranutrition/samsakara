import { Suspense, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieConsent } from "./CookieConsent";
import { RoutePrefetcher } from "./RoutePrefetcher";



export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <RoutePrefetcher />
      <Header />
      <main className="route-transition flex-1">{children}</main>
      <Footer />
      <CookieConsent />

    </div>
  );
}
