import React from "react";
import Sidebar from "./Layout/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-black pt-1">
      <div className="container h-full mx-auto xl:px-30 max-w-7xl">
        <div className="grid grid-cols-5 h-full">
          <Sidebar />
          <div
            className="
                    col-span-4
                    lg:col-span-3
                    border-x-[1px]
                    border-neutral-800
                    
                "
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
