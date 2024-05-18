import axios from "axios";

const apiBase = "https://px-01-1.onrender.com/api/v1";

const handleError = (error) => {
  console.log(error);
  return { error: error.response?.data?.message || error.message };
};

export const getAllProucts = async () => {
  try {
    const response = await axios.get(`${apiBase}/products`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getProductDetails = async (id) => {
  try {
    const response = await axios.get(`${apiBase}/product/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getUser = async (id) => {
  try {
    console.log("id in details", id);
    const response = await axios.get(`${apiBase}/user-details/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getMyOrders = async (id) => {
  try {
    const response = await axios.get(`${apiBase}/user/orders/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${apiBase}/admin/orders`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${apiBase}/admin/all-users`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getallSlider = async () => {
  try {
    const response = await axios.get(`${apiBase}/admin/all-slider`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getallbanner = async () => {
  try {
    const response = await axios.get(`${apiBase}/admin/all-banner`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getallTestimonial = async () => {
  try {
    const response = await axios.get(`${apiBase}/admin/all-testimonal`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAllCategory = async () => {
  try {
    const response = await axios.get(`${apiBase}/admin/categories`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAllReviews = async (id) => {
  try {
    const response = await axios.get(`${apiBase}/user/reviews/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getMyTestimonials = async (id) => {
  try {
    const response = await axios.get(`${apiBase}/user/all-testimonal/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
