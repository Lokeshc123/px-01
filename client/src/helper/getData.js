import axios from "axios";

export const getAllProucts = async () => {
  try {
    const response = await axios.get(
      "https://px-01.onrender.com/api/v1/products"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getProductDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://px-01.onrender.com/api/v1/product/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(
      `https://px-01.onrender.com/api/v1/user-details/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyOrders = async (id) => {
  try {
    const response = await axios.get(
      `https://px-01.onrender.com/api/v1/user/orders/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(
      `https://px-01.onrender.com/api/v1/admin/orders`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      `https://px-01.onrender.com/api/v1/admin/all-users`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getallSlider = async () => {
  try {
    const response = await axios.get(
      `https://px-01.onrender.com/api/v1/admin/all-slider`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getallbanner = async () => {
  try {
    const response = await axios.get(
      `https://px-01.onrender.com/api/v1/admin/all-banner`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getallTestimonial = async () => {
  try {
    const response = await axios.get(
      `https://px-01.onrender.com/api/v1/admin/all-testimonal`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategory = async () => {
  try {
    const response = await axios.get(
      `https://px-01.onrender.com/api/v1/admin/categories`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllReviews = async (id) => {
  try {
    const response = await axios.get(
      `https://px-01.onrender.com/api/v1/user/reviews/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyTestimonials = async (id) => {
  try {
    const response = await axios.get(
      `https://px-01.onrender.com/api/v1/user/all-testimonal/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
