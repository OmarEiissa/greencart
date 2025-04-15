import User from "../models/user.model.js";

// Update User CartData: /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { userId } = req.userId;
    const { cartItems } = req.body;

    await User.findByIdAndUpdate(userId, { cartItems });

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
    });
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
