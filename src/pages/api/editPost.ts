import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") return res.status(405).end();

  try {
    const { postId, postBody } = req.body.data;
    const { currentUser } = await serverAuth(req);

    if (
      !postId ||
      typeof postId !== "string" ||
      !postBody ||
      typeof postBody !== "string"
    )
      throw new Error("Invalid Post ID or Body!");

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      },
      select: {
        userId: true
      }
    });

    if (post?.userId !== currentUser.id) throw new Error("UnAuthorized!");

    if (req.method === "PATCH") {
      const post = await prisma.post.update({
        where: {
          id: postId
        },
        data: {
          body: postBody
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
