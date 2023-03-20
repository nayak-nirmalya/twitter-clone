import React from "react";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";

import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import SidebarTweetButton from "./SidebarTweetButton";

const Sidebar = () => {
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
    },
    {
      label: "Profiel",
      href: "/users/7008",
      icon: FaUser,
    },
  ];

  return (
    <div className="col-span-1 h-full pl-4 pr-4 md:pl-6 md:pr-6 lg:pl-10 lg:pr-0">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              label={item.label}
              href={item.href}
              icon={item.icon}
            />
          ))}
          <SidebarItem
            onClick={() => {}}
            icon={BiLogOut}
            label="Log Out"
            href=""
          />
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
