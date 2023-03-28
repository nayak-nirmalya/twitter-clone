import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") return res.status(405).end();

  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req);

    if (!postId || typeof postId !== "string")
      throw new Error("Invalid Post ID!");

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      },
      select: {
        userId: true
      }
    });

    if (post?.userId !== currentUser.id) throw new Error("UnAuthorized!");

    if (req.method === "DELETE") {
      const post = await prisma.post.delete({
        where: {
          id: postId
        }
      });

      if (!post) throw new Error("No Post with Given ID!");

      return res.status(200).json(post);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}
