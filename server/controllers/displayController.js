const {
  Banner,
  Slider,
  BestProduct,
  Testimonial,
} = require("../models/Display");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

const addTestimonial = async (req, res, next) => {
  try {
    // Extract testimonial data from request body
    const { name, comments, image, user } = req.body;

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.v2.uploader.upload(image, {
      folder: "testimonials", // Specify the folder in Cloudinary
    });

    // Create testimonial with uploaded image
    const testimonial = await Testimonial.create({
      name,
      comments,
      image: {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      },
      user,
    });

    // Send success response with the created testimonial
    res.status(201).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    next(new ErrorHandler(error.message, 400));
  }
};
// Get all testimonials for a user
const getAllUserTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.find({ user: id });
    res.status(200).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

const getallTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.find();
    res.status(200).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!testimonial) {
      return next(new ErrorHandler("Testimonial not found", 404));
    }

    res.status(200).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return next(new ErrorHandler("Testimonial not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

const addBanner = async (req, res, next) => {
  try {
    // Extract banner data from request body
    const { title, description, image } = req.body;

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.v2.uploader.upload(image, {
      folder: "banners", // Specify the folder in Cloudinary
    });

    // Create banner with uploaded image
    const banner = await Banner.create({
      tittle: title,
      description,
      image: {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      },
    });

    // Send success response with the created banner
    res.status(201).json({
      success: true,
      banner,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    next(new ErrorHandler(error.message, 400));
  }
};
const getAllBanner = async (req, res, next) => {
  try {
    const banner = await Banner.find();
    res.status(200).json({
      success: true,
      banner,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

const updateBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!banner) {
      return next(new ErrorHandler("Banner not found", 404));
    }

    res.status(200).json({
      success: true,
      banner,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

const deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByIdAndDelete(id);

    if (!banner) {
      return next(new ErrorHandler("Banner not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

const addSlider = async (req, res, next) => {
  try {
    const { title, description, images } = req.body;
    const uploadedImages = [];

    // Iterate over each image path in the request body
    for (const imagePath of images) {
      try {
        // Upload each image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(imagePath, {
          folder: "slider",
        });
        // Push the uploaded image data (public_id and url) to the uploadedImages array
        uploadedImages.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle Cloudinary upload error (e.g., return appropriate error message to user)
        return res.status(500).json({
          success: false,
          error: "Error uploading image",
        });
      }
    }

    // Create slider with title, description, and uploaded images
    const slider = await Slider.create({
      tittle: title,
      description,
      image: uploadedImages,
    });

    // Send success response with the created slider
    res.status(201).json({
      success: true,
      slider,
    });
  } catch (error) {
    // Handle any other errors that occur during the process
    next(new ErrorHandler(error.message, 400));
  }
};

const updateSlider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!slider) {
      return next(new ErrorHandler("Slider not found", 404));
    }

    res.status(200).json({
      success: true,
      slider,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

const deleteSlider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findByIdAndDelete(id);

    if (!slider) {
      return next(new ErrorHandler("Slider not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Slider deleted successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};
const getAllSlider = async (req, res, next) => {
  try {
    const slider = await Slider.find();
    res.status(200).json({
      success: true,
      slider,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

const addBestProduct = async (req, res, next) => {
  try {
    const bestProduct = await BestProduct.create(req.body);
    res.status(201).json({
      success: true,
      bestProduct,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

const updateBestProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bestProduct = await BestProduct.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bestProduct) {
      return next(new ErrorHandler("Best Product not found", 404));
    }

    res.status(200).json({
      success: true,
      bestProduct,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

const deleteBestProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bestProduct = await BestProduct.findByIdAndDelete(id);

    if (!bestProduct) {
      return next(new ErrorHandler("Best Product not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Best Product deleted successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

const deleteUserTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return next(new ErrorHandler("Testimonial not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

module.exports = {
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  addBanner,
  updateBanner,
  deleteBanner,
  addSlider,
  updateSlider,
  deleteSlider,
  addBestProduct,
  updateBestProduct,
  deleteBestProduct,
  getallTestimonial,
  getAllBanner,
  getAllSlider,
  getAllUserTestimonial,
  deleteUserTestimonial,
};
