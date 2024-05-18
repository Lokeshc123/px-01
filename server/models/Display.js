const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Electronics", "Men wear", "Kids wear", "Women wear"],
  },
});

const bannerSchema = new mongoose.Schema({
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const bestProductSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

const testimonialSchema = new mongoose.Schema({
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  name: {
    require: true,
    type: String,
  },
  comments: {
    require: true,
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = {
  Slider: mongoose.model("Slider", sliderSchema),
  Banner: mongoose.model("Banner", bannerSchema),
  BestProduct: mongoose.model("BestProduct", bestProductSchema),
  Testimonial: mongoose.model("Testimonial", testimonialSchema),
};
