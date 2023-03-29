import React from "react";
import { useSession } from "next-auth/react";

import Button from "./Button";
import FormAfterLogin from "./FormAfterLogin";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
  title?: string;
}

const Form: React.FC<FormProps> = ({
  placeholder,
  isComment,
  postId,
  title
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { status } = useSession();

  return (
    <div className="border-b-[1px] border-neutral-500 px-5 py-2">
      {status === "authenticated" ? (
        <FormAfterLogin
          placeholder={placeholder}
          isComment={isComment}
          postId={postId}
        />
      ) : (
        <div className="py-8">
          <h1
            className="
                mb-4
                text-center
                text-2xl
                font-bold
                text-white
            "
          >
            {title || "Welcome to Twitter!"}
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Log In" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
