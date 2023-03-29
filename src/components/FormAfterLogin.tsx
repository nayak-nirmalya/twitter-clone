import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useCallback, useState } from "react";

import Avatar from "./Avatar";
import Button from "./Button";

import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import useCurrentUser from "@/hooks/useCurrentUser";

export interface FormAfterLoginProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const FormAfterLogin: React.FC<FormAfterLoginProps> = ({
  placeholder,
  isComment,
  postId
}) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments/?postId=${postId}` : "/api/posts";

      await axios.post(url, { body });

      if (isComment) {
        toast.success("Comment Created!");
      } else {
        toast.success("Tweet Created!");
      }

      setBody("");
      mutatePost();
      mutatePosts();
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [body, postId, isComment, mutatePost, mutatePosts]);

  return (
    <div className="flex flex-row gap-4">
      <div>
        <Avatar userId={currentUser?.id} />
      </div>
      <div className="w-full">
        <textarea
          id="myTextarea"
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
  );
};

export default FormAfterLogin;
