import Jwt from "jsonwebtoken";

const generateToken = (payload, expired) => {
  return Jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expired,
  });
};

export default generateToken