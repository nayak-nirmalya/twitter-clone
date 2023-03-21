import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) return;

    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", {
        email,
        password
      });

      loginModal.onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="E-Mail"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-4 text-center text-neutral-400">
      <p>
        First Time Using Twitter?
        <span
          onClick={onToggle}
          className="cursor-pointer text-white hover:underline"
        >
          {" "}
          Rgister
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Log In"
      actionLabel="Sign In"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
