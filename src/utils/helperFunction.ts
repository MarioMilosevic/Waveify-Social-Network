import { baseUrl } from "./constants";
import { setUser, setUserPosts } from "../redux/features/userSlice";
import { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import marioPicture from "../assets/mariomilosevic.jpg";
import { UserType } from "./types";

export const fetchData = async (
  // method = "GET",
  endpoint: string,
  payload?: { email: string; password: string }
) => {
  try {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    const options: {
      method?: string;
      headers: { [key: string]: string };
      body?: string;
    } = {
      headers,
    };

    if (endpoint === "login") {
      options.body = JSON.stringify(payload);
      options.method = "POST";
    } else {
      options.method = "GET";
      const jwt = localStorage.getItem("jwt");
      if (!jwt) throw new Error("No JWT found");
      headers["Authorization"] = `Bearer ${jwt}`;
    }

    const response = await fetch(`${baseUrl}/${endpoint}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      const errorData = JSON.parse(errorText);
      throw new Error(errorData.error.message);
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};



export const getUserInformation = async (
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  try {
    const currentUser = await fetchData("/accounts/me");
    const posts = await fetchData("/posts");
    // odje promiseAll
    const updatedUser = updateUser(currentUser)

    dispatch(setUser(updatedUser));
    dispatch(setUserPosts(posts));
    navigate("/home");
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
};

export const updateUser = (user: UserType) => {
  return { ...user, full_name: "Mario Milosevic", picture: marioPicture, username:"mario_milosevic" };
};