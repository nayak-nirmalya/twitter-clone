import useUser from "@/hooks/useUser";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import PostFeed from "@/components/posts/PostFeed";

import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  return (
    <>
      <Head>
        <title>
          {fetchedUser && fetchedUser?.name
            ? `${fetchedUser?.name} - Profile`
            : `User Profile - Twitter`}
        </title>
        <meta name="description" content="User Profile Page." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/twitter_icon.ico" />
      </Head>
      {(isLoading || !fetchedUser) && (
        <div
          className="
          flex
          h-full
          items-center
          justify-center
          "
        >
          <ClipLoader color="lightblue" size={80} />
        </div>
      )}
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
