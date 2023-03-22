import React, { ReactNode, useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { ProductsContext } from "./ProductsContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { setSelectedProducts } = useContext(ProductsContext);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("success")) {
      setSelectedProducts([]);
      setSuccess(true);
    }
  }, []);
  return success ? (
    <div>
      <div className="main p-5">
        <div className="mb-5 bg-green-400 text-white text-lg p-5 rounded-xl">
          Success
        </div>
       
      </div>
      <Footer />
    </div>
  ) : (
    <div>
      <NavBar/>
      <div className="main p-5">{children}</div>
      <Footer />
    </div>
  );
}
