import { prisma } from "../../lib/prisma.ts";

const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({
      status: "success",
      data: {
        users: users.map((user) => {
          delete user.password;
          return user;
        }),
      },
    });
  } catch (error) {
    next(error);
  }
};

export { getUsers };
