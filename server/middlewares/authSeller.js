import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET_KEY);
    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
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

export default authSeller;
