import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">העמוד לא נמצא</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          העמוד שחיפשת אינו קיים או הועבר.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            חזרה לעמוד הבית
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">משהו השתבש</h1>
        <p className="mt-2 text-sm text-muted-foreground">נסי לרענן את העמוד.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            נסי שוב
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "קורס מאפרת מקצועית — לבנות אחרי צבא / שירות לאומי" },
      { name: "description", content: "קורס איפור מקצועי 6-8 חודשים, מזוודת איפור בשווי 11,000 ₪, תעודה בינלאומית ועבודה מובטחת. תשלום מהפיקדון הצבאי." },
      { name: "author", content: "מכללה לאיפור" },
      { property: "og:title", content: "קורס מאפרת מקצועית — לבנות אחרי צבא / שירות לאומי" },
      { property: "og:description", content: "קורס איפור מקצועי 6-8 חודשים, מזוודת איפור בשווי 11,000 ₪, תעודה בינלאומית ועבודה מובטחת. תשלום מהפיקדון הצבאי." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "קורס מאפרת מקצועית — לבנות אחרי צבא / שירות לאומי" },
      { name: "twitter:description", content: "קורס איפור מקצועי 6-8 חודשים, מזוודת איפור בשווי 11,000 ₪, תעודה בינלאומית ועבודה מובטחת. תשלום מהפיקדון הצבאי." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2f1d496e-a668-4a63-8666-56c3e6c87512/id-preview-0a9d427d--870e0daf-97e9-4a0b-a44d-6da7007a0c12.lovable.app-1781550909321.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2f1d496e-a668-4a63-8666-56c3e6c87512/id-preview-0a9d427d--870e0daf-97e9-4a0b-a44d-6da7007a0c12.lovable.app-1781550909321.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700;900&family=Frank+Ruhl+Libre:wght@300;400;500;700;900&family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
