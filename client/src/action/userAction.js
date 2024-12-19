import axios from "axios";


axios.defaults.withCredentials = true; 

export const login = async (userData) => {
  console.log("login", userData);
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_GATEWAY}/api/auth/login`,
      userData,
      { withCredentials: true } 
    );
    console.log(data);

    localStorage.setItem('userInfo', JSON.stringify(data));

   
  

    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      // dispatch(loginFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(loginFailure("Something went wrong"));
    }
  }
};

export const signUp = async (userData) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_GATEWAY}/api/auth/signup`,
      userData,
      { withCredentials: true } // Ensure credentials (cookies) are sent
    );
    console.log(data);

    // Optionally, store the user info in localStorage (or use cookies)
    localStorage.setItem('userInfo', JSON.stringify(data));

    // You can also set a cookie here if you prefer to store the token in cookies
    document.cookie = `token=${data.token}; path=/; max-age=3600; SameSite=None; Secure`;

    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      // dispatch(loginFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(loginFailure("Something went wrong"));
    }
  }
};
