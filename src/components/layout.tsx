
import React, { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";
type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "crecode" }: Props) => (
  <div className="layout">
    <header>
      <Header></Header>
    </header>
    {children}
    <footer>
     <Footer></Footer>
    </footer>
  </div>
);

export default Layout;
