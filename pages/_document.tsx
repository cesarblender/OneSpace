import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta property="og:title" content="OneSpace" />
          <meta
            property="og:description"
            content="Conoce e interactúa con personas en One Space."
          />
          <meta
            property="og:image"
            content="https://onespace.tk/cover_photo.png"
          />
          <meta property="og:url" content="https://onespace.tk/" />
          <meta name="theme-color" content="#313131" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
