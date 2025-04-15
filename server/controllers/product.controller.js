import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model.js";

// Add Product: /api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    const images = req.files;

    const existingProduct = await Product.findOne({
      name: productData.name,
      category: productData.category,
      price: productData.price,
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product already exists",
      });
    }

    if (!productData.name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!productData.description) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    if (!productData.category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!productData.price) {
      return res.status(400).json({
        success: false,
        message: "Price is required",
      });
    }

    if (!productData.offerPrice) {
      return res.status(400).json({
        success: false,
        message: "Offer price is required",
      });
    }

    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Images are required",
      });
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024;

    for (let i = 0; i < images.length; i++) {
      if (!allowedTypes.includes(images[i].mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Invalid image type",
        });
      }

      if (images[i].size > maxSize) {
        return res.status(400).json({
          success: false,
          message: "Image size should be less than 5MB",
        });
      }
    }

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
          folder: "Green-Cart/products-image",
        });
        return result.secure_url;
      })
    );

    await Product.create({
      ...productData,
      image: imagesUrl,
    });

    res.status(200).json({
      success: true,
      message: "Product added successfully",
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

// Get Product: /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      // message: "Products fetched successfully",
      products,
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

// Get single Product: /api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.status(200).json({
      success: true,
      // message: "Product fetched successfully",
      product,
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

// Change Product inStock: /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    await Product.findByIdAndUpdate(id, { inStock });
    res.status(200).json({
      success: true,
      message: "Product stock updated successfully",
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
