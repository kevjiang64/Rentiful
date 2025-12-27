import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

//ORM to get database information
const prisma = new PrismaClient();

export const getTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    //Get id from endpoint
    const { cognitoId } = req.params;

    //Grab tenant from db with additional favorites field
    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId },
      include: {
        favorites: true,
      },
    });

    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ message: "Tenant not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving tenant: ${error.message}` });
  }
};

export const createTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;

    const tenant = await prisma.tenant.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });

    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ message: "Tenant not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving tenant: ${error.message}` });
  }
};
