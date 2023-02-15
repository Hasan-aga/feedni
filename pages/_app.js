import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Layout from "@/components/layout";
import ErrorBoundary from "@/components/errorBoundry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export default function App({ Component, session, pageProps }) {
  // 2. Use at the root of your app
  const lightTheme = createTheme({
    type: "light",
    theme: {},
  });

  const darkTheme = createTheme({
    type: "dark",
    theme: {
      colors: {
        // brand colors
        background: "#000037",
        backgroundAlpha: "#00005c",
        foreground: "#F0CAA3",
        backgroundContrast: "#3B185F",
        white: "#e6e6ef",
        // blue50: "#",
        // blue100: "#",
        // blue200: "#",
        // blue300: "#",
        blue400: "#000040",
        blue500: "rgba(137, 116, 159, 0.7)",
        blue600: "#89749f",
        blue700: "#9d8caf",
        // blue800: "#",
        // blue900: "#",
        // purple50: "#",
        // purple100: "#",
        // purple200: "#",
        // purple300: "#",
        // purple400: "#",
        // purple500: "#",
        // purple600: "#",
        // purple700: "#",
        // purple800: "#",
        // purple900: "#",
        // green50: "#",
        // green100: "#",
        // green200: "#",
        // green300: "#",
        // green400: "#",
        // green500: "#",
        // green600: "#",
        // green700: "#",
        // green800: "#",
        // green900: "#",
        // yellow50: "#",
        // yellow100: "#",
        // yellow200: "#",
        // yellow300: "#",
        // yellow400: "#",
        // yellow500: "#",
        // yellow600: "#",
        // yellow700: "#",
        // yellow800: "#",
        // yellow900: "#",
        // red50: "#",
        // red100: "#",
        // red200: "#",
        // red300: "#",
        // red400: "#",
        // red500: "#",
        // red600: "#",
        // red700: "#",
      },
    },
  });

  //todo: override default themes
  // if you remove NextUIProvider, themes still work since we are using default themes.

  //react query
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider theme={darkTheme}>
        <NextThemesProvider
          defaultTheme="dark"
          attribute="class"
          value={{
            light: lightTheme.className,
            dark: darkTheme.className,
          }}
        >
          <SessionProvider session={session}>
            <ErrorBoundary>
              <Toaster />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ErrorBoundary>
          </SessionProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
