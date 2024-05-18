import axios from "axios";

export const register = async (user) => {
  try {
    const response = await axios.post(
      "https://px-01-1.onrender.com/api/v1/register",
      user
    );
    return response.data || response;
  } catch (error) {
    return { error: error.response.data.message || error.message };
  }
};

export const login = async (user) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const response = await axios.post(
      "https://px-01-1.onrender.com/api/v1/login",
      user
      // { withCredentials: true }
    );
    return response.data || response;
  } catch (error) {
    return { error: error.response.data.message || error.message };
  }
};

export const takeOrder = async (order) => {
  try {
    const response = await axios.post(
      "https://px-01-1.onrender.com/api/v1/orders/new",
      order,
      { withCredentials: true }
    );
    return response.data || response;
  } catch (error) {
    return { error: error.message }; // Provide a more user-friendly error message
  }
};

export const changeRole = async (id, data) => {
  try {
    const response = await axios.put(
      `https://px-01-1.onrender.com/api/v1/admin/user-role/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const changeStatusOrder = async (id, data) => {
  try {
    const response = await axios.put(
      `https://px-01-1.onrender.com/api/v1/admin/order/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const createProduct = async (product) => {
  try {
    const response = await axios.post(
      "https://px-01-1.onrender.com/api/v1/admin/product/new",
      product,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `https://px-01-1.onrender.com/api/v1/admin/product/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(
      `https://px-01-1.onrender.com/api/v1/admin/product/${id}`,
      product,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const updateUser = async (data) => {
  try {
    const response = await axios.put(
      `https://px-01-1.onrender.com/api/v1/user/profile-update`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const addSlider = async (data) => {
  try {
    const response = await axios.post(
      "https://px-01-1.onrender.com/api/v1/admin/slider",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const addTestimonial = async (data) => {
  try {
    const response = await axios.post(
      "https://px-01-1.onrender.com/api/v1/admin/testimonal",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const addBanner = async (data) => {
  try {
    const response = await axios.post(
      "https://px-01-1.onrender.com/api/v1/admin/banner",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteBanner = async (id) => {
  try {
    const response = await axios.delete(
      `https://px-01-1.onrender.com/api/v1/admin/banner/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteTestimonial = async (id) => {
  try {
    const response = await axios.delete(
      `https://px-01-1.onrender.com/api/v1/admin/testimonal/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(
      `https://px-01-1.onrender.com/api/v1/admin/order/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const addCategory = async (data) => {
  try {
    const response = await axios.post(
      "https://px-01-1.onrender.com/api/v1/admin/category/new",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const addReview = async (data) => {
  try {
    const response = await axios.put(
      "https://px-01-1.onrender.com/api/v1/product/add-review",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteTestimonialUser = async (id) => {
  try {
    const response = await axios.delete(
      `https://px-01-1.onrender.com/api/v1/user/delete-testimonal/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getSearchedProducts = async (search) => {
  try {
    const response = await axios.get(
      `https://px-01-1.onrender.com/api/v1/products?keyword=${search}`
    );
    return response;
  } catch (error) {
    return { error: error.message };
  }
};

export const forgetPasswordUser = async (user) => {
  try {
    const response = await axios.post(
      "https://px-01-1.onrender.com/api/v1/forget-password",
      user
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const resetUserPassword = async (token, data) => {
  try {
    const response = await axios.put(
      `https://px-01-1.onrender.com/api/v1/reset-password/${token}`,
      data
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const changePassword = async (data) => {
  try {
    const response = await axios.put(
      `https://px-01-1.onrender.com/api/v1/change-password`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};
