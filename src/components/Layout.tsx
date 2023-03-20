import React from "react";
import FollowBar from "./Layout/FollowBar";
import Sidebar from "./Layout/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-black pt-1">
      <div className="xl:px-30 container mx-auto h-full max-w-7xl">
        <div className="grid h-full grid-cols-5">
          <Sidebar />
          <div
            className="
                    col-span-4
                    border-x-[1px]
                    border-neutral-800
                    lg:col-span-3
                    
                "
          >
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
