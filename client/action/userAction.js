import axios from 'axios'

export const login = async (email, password) => {
  console.log("login", email, password);
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_GATEWAY}/api/auth/login`,
      {
        email,
        password,
      }
    );
    console.log(data);

    //   localStorage.setItem("userInfo", JSON.stringify(data));
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

export const signUp = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${process.env.API_GATEWAY}/api/auth/login`,
      {
        email,
        password,
      }
    );
    console.log(data);

    //   localStorage.setItem("userInfo", JSON.stringify(data));
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
