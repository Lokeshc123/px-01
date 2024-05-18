const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/User");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const Product = require("../models/products");
const sendToken = require("../utils/token");
const sendEmail = require("../utils/sendEmail");
// Register user

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "public_id",
        url: "url",
      },
    });
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// Login

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }
  try {
    const user = await User.findOne({
      email,
    }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// Logout

const logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};
// Forgot password

const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({
    validateBeforeSave: false,
  });

  const message = `Your password reset token is as follows:\n\n${resetToken}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({
      validateBeforeSave: false,
    });
    return next(new ErrorHandler(error.message, 500));
  }
};

// Reset Password
const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
};
// User getails

const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
};

const getUserDetails = async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated" });
  }
  // Proceed with fetching user details
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};
// change password
const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isCorrect = await user.comparePassword(req.body.oldPassword);
    if (!isCorrect) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// Update user Profile

const updateUserProfile = async (req, res, next) => {
  try {
    const uploadedImages = [];

    if (req.body.avatar) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "user",
        });
        uploadedImages.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      } catch (error) {
        console.error("Error uploading avatar:", error);
        // Handle cloudinary upload error (e.g., return appropriate error message to user)
        return res.status(500).json({
          success: false,
          error: "Error uploading avatar",
        });
      }
    }

    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      avatar:
        uploadedImages.length > 0
          ? uploadedImages[0]
          : { public_id: "abc", url: "abc" },
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const Users = await User.find();
    res.status(200).json({
      success: true,
      Users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get details of a single user as an admin

const getDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorHandler(`User does not found with id: ${req.params.id}`)
      );
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// Edit user role as admin

const editRole = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    const newUser = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// Delete user as admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler(`User not found with id: ${req.params.id}`));
    }
    await user.deleteOne();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all reviews by a user
const getUserReviews = async (req, res, next) => {
  const userId = req.params.id;

  try {
    // Find products where the user has left reviews
    const products = await Product.find({ "reviews.user": userId });

    // Initialize an empty array to store user reviews with product information
    let userReviews = [];

    // Iterate through each product to extract user reviews
    products.forEach((product) => {
      // Filter user reviews for the current product
      const productUserReviews = product.reviews.filter(
        (review) => review.user.toString() === userId
      );

      // Add product information to each review and concatenate to the overall userReviews array
      productUserReviews.forEach((review) => {
        userReviews.push({
          productId: product._id, // Assuming product ID is stored in _id field
          productName: product.name, // Assuming product name is stored in name field
          review: review,
        });
      });
    });

    // Send the user reviews with product information in the response
    res.status(200).json({
      success: true,
      reviews: userReviews,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  changePassword,
  getAllUsers,
  updateUserProfile,
  getDetails,
  editRole,
  deleteUser,
  getUser,
  getUserReviews,
};
