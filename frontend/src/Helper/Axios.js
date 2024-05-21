import axios from "axios";
import { BACK_END_URL } from '../constant';

const axiosFetch = async ({ url, method, data = null }) => {
  try {
    // Retrieve the token from sessionStorage
    const token = sessionStorage.getItem("token") ?? "{}";

    // Make the API request using axios
    const response = await axios.request({
      url: BACK_END_URL + url,
      method,
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    // Return the response if successful
    return response;
  } catch (err) {
    // Display a custom error message if the request fails
    // alert("Error: The server is currently unavailable. Please try again later.");
    console.error("API request error:", err); // Log the error for debugging purposes

    // Optionally, return an error object or message for further handling in the calling code
    return { error: true, message: "The server is currently unavailable." };
  }
};

export default axiosFetch;
