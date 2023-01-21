const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../schemas/user");

dotenv.config();
const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      // "Please, provide a token in request authorization header"
      return res.status(401).json({ message: "Not authorized1" });
    }

    const [TypeToken, token] = authorization.split(" ");
    if (TypeToken !== "Bearer" || !token) {
      // "Please, provide a token"
      return res.status(401).json({ message: "Not authorized2" });
    }

    const decodeToken = jwt.verify(token, JWT_SECRET);
    const id = decodeToken.id;
    // console.log({ decodeTokenId: id });
    if (!id) {
      // "token not have id"
      return res.status(401).json({ message: "Not authorized3" });
    }

    const storedUser = await User.findById(id);
    if (!storedUser) {
      // "user not exist"
      return res.status(401).json({ message: "Not authorized4" });
    }

    if (storedUser.token !== token) {
      return res.status(401).json({ message: "Not authorized5" });
    }

    req.user = storedUser;
    next();
  } catch (err) {
    // console.error("authM err:", err);
    // "Invalid token"
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = {
  authMiddleware,
};
