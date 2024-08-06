import marioPicture from "../assets/mariomilosevic.jpg";
import { baseUrl } from "./constants";
import { setUser, setUserPosts } from "../redux/features/userSlice";
import { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import { UserType } from "./types";


export const fetchData = async (
  endpoint: string,
  payload?: { [key: string]: string },
  method: string = "GET"
) => {
  try {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    // Get JWT token from local storage
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      headers["Authorization"] = `Bearer ${jwt}`;
    }

    const options: {
      method: string;
      headers: { [key: string]: string };
      body?: string;
    } = { headers, method };

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

// export const fetchData = async (
//   endpoint: string,
//   payload?: { [key: string]: string },
//   method: string = "GET"
// ) => {
//   try {
//     const headers: { [key: string]: string } = {
//       "Content-Type": "application/json",
//     };
//     const options: {
//       method: string;
//       headers: { [key: string]: string };
//       body?: string;
//     } = { headers, method };

//     if (method === "POST" && payload) {
//       options.body = JSON.stringify(payload);
//     } else {
//       const jwt = localStorage.getItem("jwt");
//       if (!jwt) throw new Error("No JWT found");
//       headers["Authorization"] = `Bearer ${jwt}`;
//     }

//     const response = await fetch(`${baseUrl}/${endpoint}`, options);

//     if (!response.ok) {
//       const errorText = await response.text();
//       const errorData = JSON.parse(errorText);
//       throw new Error(errorData.error.message);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("There was a problem with the fetch operation:", error);
//     throw error;
//   }
// };

export const getUserInformation = async (
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  try {
    const [{ account }, { posts }] = await Promise.all([
      fetchData("/accounts/me"),
      fetchData("/posts"),
    ]);
    const updatedUser = updateUser(account);
    dispatch(setUser(updatedUser));
    dispatch(setUserPosts(posts));
    navigate("/home");
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
};

export const updateUser = (user: UserType) => {
  return {
    ...user,
    full_name: "Mario Milosevic",
    picture: marioPicture,
    username: "mario_milosevic",
  };
};

export const formatDate = (date: string) => {
  const formattedDate = new Date(date)
    .toLocaleDateString("en-GB")
    .replace(/\//g, ".");
  return formattedDate;
};

export const getPostInformation = async (id: string) => {
  try {
    const postEndpoint = `posts/${id}`;
    const commentsEndpoint = `${postEndpoint}/comments`;

    const [{ post }, { comments }] = await Promise.all([
      fetchData(postEndpoint),
      fetchData(commentsEndpoint),
    ]);

    return { post, comments };
  } catch (error) {
    console.error("Fetching comments failed:", error);
    throw error;
  }
};

export const postComment = async (
  postId: string,
  comment: { text: string }
) => {
  try {
    const endpoint = `posts/${postId}/comments`;
    const response = await fetchData(endpoint, comment, "POST");
    console.log("Comment posted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};
