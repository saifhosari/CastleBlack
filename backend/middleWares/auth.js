import Jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const authUser = async (req, res, next) => {
  try {
    let tmp = req.header("Authorization");
    const token = tmp ? tmp.slice(7, tmp.length) : "";
    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid Authentication" });
    }
    Jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid Authentication" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export default authUser;
