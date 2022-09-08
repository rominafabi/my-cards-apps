import { RemixBrowser } from "@remix-run/react";
import { startTransition} from "react";
import { hydrateRoot } from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";

const hydrate = () => {
  startTransition(() => {
    hydrateRoot(
      document,
      <ThemeProvider>
      <RemixBrowser />
    </ThemeProvider>
    );
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
