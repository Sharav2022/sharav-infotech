import Layout from "../src/components/main/Layout";
import "../src/styles/globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function App({ Component, pageProps }) {
  const layoutProps = Component.getLayoutProps || (() => {});

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${manrope.style.fontFamily};
        }
      `}</style>
      <Layout {...pageProps} {...layoutProps()}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
