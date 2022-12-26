import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// For sign-in.
export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

// For sign-up.
export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

// Function to create a JWT token and send back to him on sign-up.
// After that the frontend should keep this token in the localStorage.
export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET
  );
  return token;
};

// Protection middleware. (for middleware always use "next")
export const protectThis = (req, res, next) => {
  const bearer = req.headers.authorization;

  // If no token, send back an error message.
  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  // We split the userSent bearer token into pieces, we need only the token part.
  const [, token] = bearer.split(" ");

  // If no token, send back an error message.
  if (!token) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  // Using try-catch because without it on error the server would die.
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.json({ message: "not a valid token" });
    return;
  }
};
