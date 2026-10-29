import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

// `headerTone="inverse"` lets pages that open on a dark hero start with a
// transparent, light-on-dark header.
export default function Layout({ children, headerTone = "default", hideFooter = false }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader tone={headerTone} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      {!hideFooter && <SiteFooter />}
    </>
  );
}
