import { PrismaClient } from "@prisma/client";
import { IBaseProposal, IPaginationParams } from "./schema.js";

const db = new PrismaClient();
export const CreateBaseProposal = async (master: IBaseProposal) => {
  const { name, category, description } = master;
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

export const GetListBaseProposal = async (params: IPaginationParams) => {
  const { keyword, page, page_size, sort } = params;

  try {
    const [data, total] = await Promise.all([
      db.baseProposal.findMany({
        where: {
          name: {
            contains: keyword,
          },
        },
        skip: (page - 1) * page_size,
        take: page_size,
        orderBy: {
          createdAt: sort,
        },
      }),
      db.baseProposal.count({
        where: {
          name: {
            contains: keyword,
          },
        },
      }),
    ]);

    return {
      status: 200,
      message: "success",
      data,
      meta: {
        total,
        page,
        page_size,
        total_pages: Math.ceil(total / page_size),
      },
    };
  } catch (error) {
    console.log("Get List Error:",error);
    return {
      status: 500,
      message: "Internal Server Error",
    }
  }
};

export const GetBaseProposal = async (master_id: string) => {
  try {
    const res = await db.baseProposal.findFirst({
      where: {
        id: master_id,
      },
    });
    if (!res) return {
      status: 404,
      message: "Data not found",
    };
  
    return {
      status: 200,
      message: "success",
      data: res,
    };
  } catch (error) {
    console.log("Get Master Error:",error);
    return {
      status: 500,
      message: "Internal Server Error",
    }
  }
};

export const UpdateBaseProposal = async (master_id: string, master_update: IBaseProposal) => {
  const { name, category, description } = master_update;
  try {
    const existMaster = await db.baseProposal.findFirst({
      where: {
        id: master_id
      },
    });

    if (!existMaster) return {
      status: 404,
      message: "Data not found",
    };

    const res = await db.baseProposal.update({
      where: {
        id: master_id,
      },
      data: {
        name,
        category: category ?? null,
        description: description ?? null,
      },
    });
    return {
      status: 200,
      message: "success",
      data: res,
    };
  } catch (error) {
    console.log("Update Error:",error);
    return {
      status: 500,
      message: "Internal Server Error",
    }
  }
};

export const DeleteBaseProposal = async (master_id: string) => {
  try {
    const existMaster = await db.baseProposal.findFirst({
      where: {
        id: master_id
      },
    });

    if (!existMaster) return {
      status: 404,
      message: "Data not found",
    };
    
    await db.baseProposal.delete({
      where: {
        id: master_id,
      },
    });

    return {
      status: 200,
      message: "success delete",
    }
  } catch (error) {
    console.log("Delete error:",error)
    return {
      status: 500,
      message: "Internal Server Error"
    }
  }
}