import { baseUrl } from "./constants";
import { setUser, setUserPosts } from "../redux/features/userSlice";
import { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import marioPicture from "../assets/mariomilosevic.jpg";
import { UserType } from "./types";

export const fetchData = async (
  endpoint: string,
  payload?: { email: string; password: string },
  method: string = "GET"
) => {
  try {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };
    const options: {
      method: string;
      headers: { [key: string]: string };
      body?: string;
    } = { headers, method };

    if (method === "POST" && payload) {
      options.body = JSON.stringify(payload);
    } else {
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

export const getPostComments = async (id: string) => {
  try {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) throw new Error("No JWT found");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    };

    const urls = [`${baseUrl}/posts/${id}`, `${baseUrl}/posts/${id}/comments`];

    const responses = await Promise.all(
      urls.map((url) => fetch(url, { headers }))
    );

    const [postResponse, commentsResponse] = responses;

    if (!postResponse.ok || !commentsResponse.ok) {
      throw new Error("One or both fetches failed");
    }

    const [postData, commentsData] = await Promise.all([
      postResponse.json(),
      commentsResponse.json(),
    ]);

    console.log({ postData, commentsData });
  } catch (error) {
    console.error("Fetching comments failed:", error);
  }
};

// export const fetchData = async (
//   endpoint: string,
//   payload?: { email: string; password: string }
// ) => {
//   try {
//     const headers: { [key: string]: string } = {
//       "Content-Type": "application/json",
//     };

//     const options: {
//       method?: string;
//       headers: { [key: string]: string };
//       body?: string;
//     } = { headers};

//     if (endpoint === "login") {
//       options.body = JSON.stringify(payload);
//       options.method = "POST";
//     } else {
//       options.method = "GET";
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
