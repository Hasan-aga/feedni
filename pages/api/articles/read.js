// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Controller } from "@/lib/controller";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      throw new Error("You are not signed in.");
    }
    const { articleid } = req.query;
    const controller = await Controller.start(session);
    switch (req.method) {
      case "POST":
        {
          await controller.markAsRead(articleid);
          res.status(200).json({ success: true });
        }
        break;
      case "DELETE":
        {
          await controller.markAsUnread(articleid);
          res.status(200).json({ success: true });
        }
        break;

      default:
        res.status(404).json({
          success: false,
          info: "No such endpoint. Check request type / path",
        });
        break;
    }
  } catch (error) {
    console.log(`failed!, ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
}
