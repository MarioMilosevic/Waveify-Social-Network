import { baseUrl } from "./constants";
import { setUser, setUserPosts } from "../redux/features/userSlice";
import { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import { updateUser } from "./helperFunction";

export const fetchData = async (
  endpoint: string,
  method: string = "GET",
  payload?: { [key: string]: string }
) => {
  try {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

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
      console.log(response)
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
    const response = await fetchData(endpoint, "POST", comment);
    return response;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};

export const removeUserComment = async (postId: string, commentId: string) => {
  try {
    const endpoint = `posts/${postId}/comments/${commentId}`;
    const response = await fetchData(endpoint, "DELETE");
    return response;
  } catch (error) {
    console.error("Error deleting comment", error);
  }
};

export const like = async (postId: string, method: string) => {
  try {
    const endpoint = `posts/${postId}/like`;
    const response = await fetchData(endpoint, method);
    console.log(response);
  } catch (error) {
    console.error("Error giving like to post", error);
  }
};

export const createNewPost = async (status: string) => {
  try {
    console.log("Payload:", { text: status });
    const response = await fetchData("posts", "POST", { text: status });
    console.log(response);
  } catch (error) {
    console.error("Error creating new post", error);
  }
};
