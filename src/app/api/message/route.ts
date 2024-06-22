import { db } from "@/db";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextApiRequest } from "next";

export const POST = async (req: NextApiRequest) => {
  const { body } = req;
  const { getUser } = getKindeServerSession();
  const user = getUser();
  const { id: userId } = user;
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { fileId, message } = SendMessageValidator.parse(body);
  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  });
  if (!file) return new Response("File not found", { status: 404 });

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      fileId,
      userId,
    },
  });
};
