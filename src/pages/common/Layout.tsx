import React from "react";

import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  return (
    <div>
      <Header />
      <main className="flex container mx-auto min-h-screen md:p-0 p-4">
        {children!}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
