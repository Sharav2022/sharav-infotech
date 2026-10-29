import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Layout from "../src/components/layout/Layout";
import "../src/styles/globals.css";

// Typography (see docs/DESIGN_SYSTEM.md#typography): Archivo's width axis for
// display, IBM Plex Sans for reading, IBM Plex Mono for technical annotation.
// Fonts are self-hosted at build time by next/font.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const layoutProps = Component.layoutProps ?? {};

  return (
    <>
      <style jsx global>{`
        :root {
          --font-archivo: ${archivo.style.fontFamily};
          --font-plex-sans: ${plexSans.style.fontFamily};
          --font-plex-mono: ${plexMono.style.fontFamily};
        }
      `}</style>
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
