import type { NextFunction, Request, Response } from "express";

import { prisma } from "../../lib/prisma-client";

export const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await prisma.user.findMany({});
      res.json({ data: users });
    }
    catch (error) {
      next(error);
    }
  },
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      if (!id) {
        res.status(400).json({ error: "ID пользователя не передан" });
      }

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      res.json({ data: user });
    }
    catch (error) {
      next(error);
    }
  },
};
