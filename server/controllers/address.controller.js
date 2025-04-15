import Address from "../models/address.model.js";

// Add Address: /api/address/add
export const addAddress = async (req, res) => {
  try {
    const { userId } = req.userId;
    const { address } = req.body;

    await Address.create({
      ...address,
      userId,
    });

    res.status(200).json({
      success: true,
      message: "Address added successfully",
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

// Get Address: /api/address/get
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.userId;
    const addresses = await Address.find({ userId });

    res.status(200).json({
      success: true,
      // message: "Address fetched successfully",
      addresses,
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
