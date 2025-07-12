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
};
