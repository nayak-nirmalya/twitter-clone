import Head from "next/head";

import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";

export default function Home() {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Twitter Clone Home Page." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/twitter_icon.ico" />
      </Head>
      <main>
        <Header label="Home" />
        <Form placeholder="What's Happening?" />
        <PostFeed />
      </main>
    </>
  );
}
