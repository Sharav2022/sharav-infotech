import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en-CA">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/brand/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/brand/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#080c18" />
        {/* Marks JS as available so scroll-reveal styles only apply when they can resolve. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
