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

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      next(error);
    }

    delete user.password;

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { getUsers,getUser };
