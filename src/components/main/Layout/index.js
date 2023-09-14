import Footer from "../Footer";
import Header from "../Header";
import classes from "./layout.module.css";

const Layout = ({ children, hideFooter }) => {
  return (
    <>
      <Header />
      <main className={classes.main}>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
