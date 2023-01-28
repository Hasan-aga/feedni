import { Controller } from "@/lib/controller";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      throw new Error("you are not signed in.");
    }
    const { url, category } = req.query;
    const controller = await Controller.start(session);
    if (req.method === "POST") {
      const info = await controller.addNewFeed(url, category);
      res.status(200).json({ success: true, info });
    }
    if (req.method === "GET") {
      const info = await controller.getMyFeeds();
      res.status(200).json({ success: true, info });
    }
    res
      .status(404)
      .json({
        success: false,
        info: "this endpoint only accepts GET or POST requests",
      });
  } catch (error) {
    console.log(`failed!, ${error}`);
    res.status(500).json({ success: false, error });
  }
}
