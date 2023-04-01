import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";

// Import Inter font
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import theme from "@/themes";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <>
        <ChakraProvider theme={theme}>
          <GoogleAnalytics trackPageViews />
          <Component {...pageProps} />
        </ChakraProvider>
      </>
    );
  }
};

export default App;
