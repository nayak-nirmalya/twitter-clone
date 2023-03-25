import React from "react";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
import { BsHouseFill, BsBellFill } from "react-icons/bs";

import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import useCurrentUser from "@/hooks/useCurrentUser";
import SidebarTweetButton from "./SidebarTweetButton";

interface CommonComponentProps {
  children: React.ReactNode;
}

const CommonComponent: React.FC<CommonComponentProps> = ({ children }) => {
  return (
    <div className="col-span-1 h-full pl-4 pr-4 md:pl-6 md:pr-6 lg:pl-10 lg:pr-0">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />

          {children}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

const SidebarWithSession = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true
    }
  ];

  return (
    <CommonComponent>
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          label={item.label}
          href={item.href}
          icon={item.icon}
          auth={item.auth}
        />
      ))}

      <SidebarItem
        onClick={() => signOut()}
        icon={BiLogOut}
        label="Log Out"
        href=""
      />
    </CommonComponent>
  );
};

const SidebarWithoutSession = () => {
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true
    },
    {
      label: "Profile",
      href: `/users/`,
      icon: FaUser,
      auth: true
    }
  ];

  return (
    <CommonComponent>
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          label={item.label}
          href={item.href}
          icon={item.icon}
          auth={item.auth}
        />
      ))}
    </CommonComponent>
  );
};

const Sidebar = () => {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <SidebarWithSession />
      ) : (
        <SidebarWithoutSession />
      )}
    </>
  );
};

export default Sidebar;
