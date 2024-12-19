import axios from "axios";

axios.defaults.withCredentials = true; 
export const getAllPost = async () => {

  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_GATEWAY}/api/post`,
      { withCredentials: true }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const createPost = async (postData) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_GATEWAY}/api/post`,
      postData
    );

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
