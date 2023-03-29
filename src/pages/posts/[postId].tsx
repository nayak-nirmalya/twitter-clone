import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import usePost from "@/hooks/usePost";

import Form from "@/components/Form";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex h-full items-center justify-center">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Tweet/Post - Twitter</title>
        <meta name="description" content="Tweet & Comments" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/twitter_icon.ico" />
      </Head>

      <Header showBackArrow label="Tweet" />
      <PostItem post={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet Your Reply."
        title="Log In / Register to Reply."
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
