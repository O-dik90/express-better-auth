import { PrismaClient } from "@prisma/client";
import { ICreateMaster } from "./schema.js";
import { validateBody } from "src/middleware/validate-body.js";

const db = new PrismaClient();
export const CreateMaster = async (params: ICreateMaster) => {
  const { name, category, description } = params;
  try {
    const existMaster = await db.baseProposal.findFirst({
      where: {
        name: name
      },
    });
    
    if (existMaster) return {
      status: 400,
      message: "Master already exists"
    };
    
    const res = await db.baseProposal.create({
      data: {
        name,
        category: category ?? null,
        description: description ?? null,
      },
    });
    return {
      status: 201,
      message: "success",
      data: res,
    };
  } catch (error) {
    console.log("Create Error:",error);
    return {
      status: 500,
      message: "Internal Server Error",
    }
  }
};
