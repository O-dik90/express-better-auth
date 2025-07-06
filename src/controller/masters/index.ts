import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
export const Master = async (params: any) => {
  const { name, category, description } = params;
  const existMaster = await db.baseProposal.findFirst({
    where: {
      name: name
    },
  });
  
  if (existMaster) return {
    status: 400,
    message: "Master already exists"
  };
  await db.baseProposal.create({
    data: {
      name,
      category,
      description,
    },
  });
};
