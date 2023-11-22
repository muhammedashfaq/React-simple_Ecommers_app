import axios from "axios";
export const fetchProductData = async () => {
  try {
    const response = await axios.post("http://localhost:5000/user/fetchProduct",{},{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};


export const addtocart = async (productId) => {
  try {
    const response = await axios.post("http://localhost:5000/user/addtocart",{productId:productId}
    ,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchCartData = async (productId) => {
  try {
    const response = await axios.post("http://localhost:5000/user/fetchcartdata",{}
    ,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
