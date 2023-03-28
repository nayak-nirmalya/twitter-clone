import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req);
    const { postId } = req.query;
    const { body } = req.body;

    if (!postId || typeof postId !== "string") throw new Error("Invalid ID!");

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId
      }
    });

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId
        }
      });

      if (post?.userId) {
        const userName: { name: string | null } | null =
          await prisma.user.findUnique({
            where: {
              id: post?.userId
            },
            select: { name: true }
          });

        await prisma.notification.create({
          data: {
            body: `${userName?.name} Replied to Your Tweet!`,
            userId: post.userId
          }
        });

        await prisma.user.update({
          where: {
            id: post.userId
          },
          data: {
            hasNotification: true
          }
        });
      }
    } catch (error) {
      console.error(error);
    }

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}
