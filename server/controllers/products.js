// productsController.js
const Product = require("../models/products");

const ErrorHandler = require("../utils/errorHandler");
const Features = require("../utils/feature");
const cloudinary = require("cloudinary");
const createProduct = async (req, res, next) => {
  req.body.user = req.user.id;

  try {
    const { name, price, description, group, stock, images } = req.body;
    console.log("Images", images);
    const uploadedImages = [];

    for (const imagePath of req.body.images) {
      const result = await cloudinary.v2.uploader.upload(imagePath, {
        folder: "products",
      });
      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      user: req.user._id,
      images: uploadedImages, // Save all uploaded images
      group,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error during image upload:", error);
    return next(new ErrorHandler(error.message, 500));
  }
};

const getAllProducts = async (req, res) => {
  try {
    const api_feature = new Features(Product.find(), req.query)
      .search()
      .filter();

    const products = await api_feature.query;
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
const getDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
// Create or modify a review

const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    const isReviewd = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewd) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.comment = comment;
          rev.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
      product.ratings =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        messgae: "Review added successfully",
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
// Get all reviews of a product
const getAllReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error: error.message,
    });
  }
};
// Delete a review
const deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.params.id.toString()
    );
    const numOfReviews = reviews.length;
    const ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      reviews.length;
    await Product.findByIdAndUpdate(
      req.params.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getDetails,
  createProductReview,
  getAllReviews,
  deleteReview,
};
