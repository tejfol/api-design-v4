import prisma from '../db';
import {comparePasswords, createJWT, hashPassword} from '../modules/auth';

export const signUp = async (req, res, next) => {
  const {username, password} = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: await hashPassword(password),
      },
    });

    const token = createJWT(user);

    res.json({token});
  } catch (error) {
    error.type = 'input';
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const {username, password} = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    const isValid = await comparePasswords(password, user.password);

    if (!isValid) {
      res.status(401);
      res.json({
        message: "Bitch, you ain't no user of my, get the fuck out off here.",
      });

      return;
    }

    const token = createJWT(user);

    res.json({
      token,
      message:
        'Bitch, you are logged in to the system, congratulation you motherfucker!',
    });
  } catch (error) {
    error.type = 'input';
    next(error);
  }
};
