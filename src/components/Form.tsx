import axios from "axios";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";

import Avatar from "./Avatar";
import Button from "./Button";

import usePosts from "@/hooks/usePosts";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useRegisterModal from "@/hooks/useRegisterModal";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { status } = useSession();

  const { mutate: mutatePosts } = usePosts();
  const { data: currentUser } = useCurrentUser();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/posts", { body });

      toast.success("Tweet Created!");

      setBody("");
      mutatePosts();
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  return (
    <div className="border-b-[1px] border-neutral-500 px-5 py-2">
      {status === "authenticated" ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              placeholder={placeholder}
              className="
                    peer
                    mt-3
                    w-full
                    resize-none
                    bg-black
                    text-[20px]
                    text-white
                    placeholder-neutral-500
                    outline-none
                    ring-0
                    disabled:opacity-80

                "
            ></textarea>
            <hr
              className="
                h-[1px]
                w-full
                border-neutral-800
                opacity-0
                transition
                peer-focus:opacity-100
            "
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                label="Tweet"
                disabled={isLoading || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
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
            Welcome to Twitter!
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
