const Category = require("../models/Category");

// Create and Save a new Category

const createCategory = async (req, res) => {
  try {
    const { name, subcategories } = req.body;
    const category = new Category({
      name,
      subcategories,
    });

    const createdCategory = await category.save();
    res.status(201).json({
      success: true,
      category: createdCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all categories

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category by the id in the request

const updateCategory = async (req, res) => {
  try {
    const { name, subcategories } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = name;
    category.subcategories = subcategories;
    const updatedCategory = await category.save();
    res.status(200).json({ success: true, category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category with the specified id in the request

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.remove();
    res.status(200).json({ success: true, message: "Category is deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
