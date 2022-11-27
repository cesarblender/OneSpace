import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { dark_theme } from "../src/theme";
import { CssBaseline, GlobalStyles } from "@mui/material";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={dark_theme}>
      <Head>
        <title>OneSpace</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalStyles
        styles={{
          body: {
            backgroundImage:
              "linear-gradient(62deg, #007bff09 0%, #8000ff09 100%)",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          },
        }}
      />
      <Component {...pageProps} />

      <CssBaseline enableColorScheme />
    </ThemeProvider>
  );
}
