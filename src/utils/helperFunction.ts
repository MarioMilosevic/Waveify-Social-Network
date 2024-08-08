import marioPicture from "../assets/mariomilosevic.jpg";
import { baseUrl } from "./constants";
import { setUser, setUserPosts } from "../redux/features/userSlice";
import { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import { UserType } from "./types";


// export const fetchData = async (
//   endpoint: string,
//   method: string = "GET",
//   payload?: { [key: string]: string },
// ) => {
//   try {
//     const headers: { [key: string]: string } = {
//       "Content-Type": "application/json",
//     };

//     const jwt = localStorage.getItem("jwt");
//     if (jwt) {
//       headers["Authorization"] = `Bearer ${jwt}`;
//     }

//     const options: {
//       method: string;
//       headers: { [key: string]: string };
//       body?: string;
//     } = { headers, method };

//     if (method === "POST" && payload) {
//       options.body = JSON.stringify(payload);
//     }

//     if (method === "DELETE") {
//       console.log('uslo u delete')
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

    if (method === "DELETE") {
      console.log("Handling DELETE request");
    }

    const response = await fetch(`${baseUrl}/${endpoint}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      const errorData = JSON.parse(errorText);
      throw new Error(errorData.error.message);
    }

    if (method !== "DELETE") {
      const data = await response.json();
      return data;
    } else {
      return { message: "Resource deleted successfully" };
    }
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
    console.log("Comment posted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};

// export const removeUserComment = async (postId: string, commentId: string) => {
//   try {
//     const response = await fetchData(
//       `posts/${postId}/comments/${commentId}`,
//       "DELETE"
//     );
//     console.log(response);
//   } catch (error) {
//     console.error("Error deleting comment", error);
//   }
// };

export const removeUserComment = async (postId: string, commentId: string) => {
  try {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      headers["Authorization"] = `Bearer ${jwt}`;
    }

    const response = await fetch(
      `${baseUrl}/posts/${postId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: headers,
      }
    );

    if (response.ok) {
      console.log("Comment deleted successfully");
      const responseJson = await response.json()
      console.log(responseJson)
    } else {
      const errorData = await response.json();
      console.error("Failed to delete comment", errorData);
    }
    console.log(response);
    return response
  } catch (error) {
    console.error("Error deleting comment", error);
  }
};


