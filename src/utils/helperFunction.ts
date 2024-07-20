import { baseUrl } from "./constants";
import { setUser, setUserPosts } from "../redux/features/userSlice";
import marioPicture from "../assets/mariomilosevic.jpg"


export const fetchData = async (
  method: string,
  endpoint: string,
  payload?: { email: string; password: string }
) => {
  try {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    const options: {
      method: string;
      headers: { [key: string]: string };
      body?: string;
    } = {
      method,
      headers,
    };

    if (endpoint !== "login") {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) throw new Error("No JWT found");
      headers["Authorization"] = "Bearer " + jwt;
    }

    if (method === "POST" && payload) {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(`${baseUrl}/${endpoint}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      const errorData = JSON.parse(errorText);
      throw new Error(errorData.error.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const getUserInformation = async (dispatch, navigate) => {
  try {
    const currentUser = await fetchData("GET", "/accounts/me");
    const posts = await fetchData("GET", "/posts");
    const updatedUser = {
      ...currentUser,
      full_name: "Mario Milosevic",
      picture: marioPicture, 
    };

    dispatch(setUser(updatedUser));
    dispatch(setUserPosts(posts));
    navigate("/home");
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
};

