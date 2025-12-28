import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

//ORM to get database information
const prisma = new PrismaClient();

export const getManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //Get id from endpoint
    const { cognitoId } = req.params;

    //Grab tenant from db with additional favorites field
    const manager = await prisma.manager.findUnique({
      where: { cognitoId },
    });

    if (manager) {
      res.json(manager);
    } else {
      res.status(404).json({ message: "manager not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving manager: ${error.message}` });
  }
};

export const createManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;

    const manager = await prisma.manager.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });

    if (manager) {
      res.json(manager);
    } else {
      res.status(404).json({ message: "Manager not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving manager: ${error.message}` });
  }
};

export const updateManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber } = req.body;

    const updateManager = await prisma.manager.update({
      where: { cognitoId },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    if (updateManager) {
      res.json(updateManager);
    } else {
      res.status(404).json({ message: "ManagerupdateManager not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating manager: ${error.message}` });
  }
};
