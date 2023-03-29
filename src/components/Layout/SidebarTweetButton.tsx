import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import { useSession } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal";

const SidebarTweetButton = () => {
  const router = useRouter();
  const { status } = useSession();
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    if (status !== "authenticated") {
      loginModal.onOpen();
    } else {
      setTimeout(function () {
        document?.getElementById("myTextarea")?.focus();
      }, 1000);

      router.push("/");
    }
  }, [loginModal, status, router]);

  return (
    <div onClick={onClick}>
      <div
        className="
            mt-6 flex
            h-14
            w-14 cursor-pointer
            items-center
            justify-center
            rounded-full
            bg-sky-500
            p-4
            transition
            hover:bg-opacity-80
            lg:hidden
        "
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="
            mt-6 mr-8 hidden
            h-14 cursor-pointer
            rounded-full
            bg-sky-500
            px-4
            py-3
            transition
            hover:bg-opacity-90
            lg:block
        "
      >
        <p
          className="
                hidden 
                text-center 
                text-[20px] 
                font-semibold 
                text-white 
                lg:block
            "
        >
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
