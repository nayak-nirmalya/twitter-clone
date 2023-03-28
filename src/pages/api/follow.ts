import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE")
    return res.status(405).end();

  try {
    const { userId } = req.body;

    const { currentUser } = await serverAuth(req);

    if (!userId || typeof userId !== "string") throw new Error("Invalid ID!");

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) throw new Error("No User!");

    let updatedFollowindIds = [...(user.followingIds || [])];

    if (req.method === "POST") {
      updatedFollowindIds.push(userId);

      try {
        const userName: { name: string | null } | null =
          await prisma.user.findUnique({
            where: {
              id: userId
            },
            select: { name: true }
          });

        await prisma.notification.create({
          data: {
            body: `${userName?.name} Followed You!`,
            userId
          }
        });

        await prisma.user.update({
          where: {
            id: userId
          },
          data: {
            hasNotification: true
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (req.method === "DELETE") {
      updatedFollowindIds = updatedFollowindIds.filter(
        (followingId) => followingId !== userId
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        followingIds: updatedFollowindIds
      }
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}
