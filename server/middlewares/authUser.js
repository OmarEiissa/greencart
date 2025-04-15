import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (tokenDecode.id) {
      req.userId = { userId: tokenDecode.id };
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    next();
  } catch (error) {
    process.env.NODE_ENV === "development" && console.log(error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
};

export default authUser;
