import axios from "axios";

const apiBase = "http://localhost:5000/api/v1";

const handleError = (error) => {
  return { error: error.response?.data?.message || error.message };
};

export const register = async (user) => {
  try {
    const response = await axios.post(`${apiBase}/register`, user);
    return response.data || response;
  } catch (error) {
    return handleError(error);
  }
};

export const login = async (user) => {
  try {
    const response = await axios.post(`${apiBase}/login`, user, {
      withCredentials: true,
    });
    return response.data || response;
  } catch (error) {
    return handleError(error);
  }
};

export const takeOrder = async (order) => {
  try {
    const response = await axios.post(`${apiBase}/orders/new`, order, {
      withCredentials: true,
    });
    return response.data || response;
  } catch (error) {
    return handleError(error);
  }
};

export const changeRole = async (id, data) => {
  try {
    const response = await axios.put(`${apiBase}/admin/user-role/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const changeStatusOrder = async (id, data) => {
  try {
    const response = await axios.put(`${apiBase}/admin/order/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const createProduct = async (product) => {
  try {
    const response = await axios.post(`${apiBase}/admin/product/new`, product, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${apiBase}/admin/product/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(
      `${apiBase}/admin/product/${id}`,
      product,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateUser = async (data) => {
  try {
    const response = await axios.put(`${apiBase}/user/profile-update`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const addSlider = async (data) => {
  try {
    const response = await axios.post(`${apiBase}/admin/slider`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const addTestimonial = async (data) => {
  try {
    const response = await axios.post(`${apiBase}/admin/testimonal`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const addBanner = async (data) => {
  try {
    const response = await axios.post(`${apiBase}/admin/banner`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteBanner = async (id) => {
  try {
    const response = await axios.delete(`${apiBase}/admin/banner/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteTestimonial = async (id) => {
  try {
    const response = await axios.delete(`${apiBase}/admin/testimonal/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(`${apiBase}/admin/order/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const addCategory = async (data) => {
  try {
    const response = await axios.post(`${apiBase}/admin/category/new`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const addReview = async (data) => {
  try {
    const response = await axios.put(`${apiBase}/product/add-review`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteTestimonialUser = async (id) => {
  try {
    const response = await axios.delete(
      `${apiBase}/user/delete-testimonal/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getSearchedProducts = async (search) => {
  try {
    const response = await axios.get(`${apiBase}/products?keyword=${search}`);
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const forgetPasswordUser = async (user) => {
  try {
    const response = await axios.post(`${apiBase}/forget-password`, user);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const resetUserPassword = async (token, data) => {
  try {
    const response = await axios.put(
      `${apiBase}/reset-password/${token}`,
      data
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const changePassword = async (data) => {
  try {
    const response = await axios.put(`${apiBase}/change-password`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
