import { baseUrl } from "./constants";
import { setUser } from "../redux/features/userSlice";
import { setPosts } from "../redux/features/posts.Slice";
import { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import { updateUser } from "./helperFunction";
import { NewPostDetails } from "./types";

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
      console.log(response);
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
    dispatch(setPosts(posts));
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
    const data = await fetchData(endpoint, "DELETE");
    return data;
  } catch (error) {
    console.error("Error deleting comment", error);
  }
};

export const like = async (postId: string, method: string) => {
  try {
    const endpoint = `posts/${postId}/like`;
    await fetchData(endpoint, method);
  } catch (error) {
    console.error("Error giving like to post", error);
  }
};

// export const createNewPost = async (postDetails: NewPostDetails) => {
//   try {
//     const url = "https://api.hr.constel.co/api/v1/posts";
//     const jwt = localStorage.getItem("jwt");

//     if (!jwt) throw new Error("Authorization token is missing");
//     if (!postDetails.text.trim()) throw new Error("Text cannot be empty!");

//     const formData = new FormData();
//     formData.append("text", postDetails.text);
//     if (postDetails.audio) {
//       const audioBlob = await fetch(postDetails.audio).then((res) =>
//         res.blob()
//       );
//       formData.append("audio", audioBlob, "recording.wav");
//     }

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`HTTP error! Status: ${response.status}. ${errorText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error creating post:", error);
//     throw error;
//   }
// };

export const createNewPost = async (postDetails: NewPostDetails) => {
  try {
    const url = "https://api.hr.constel.co/api/v1/posts";
    const jwt = localStorage.getItem("jwt");

    if (!jwt) throw new Error("Authorization token is missing");
    if (!postDetails.text.trim()) throw new Error("Text cannot be empty!");

    // Use FormData to handle both text and binary data
    const formData = new FormData();
    formData.append("text", postDetails.text);

    if (postDetails.audio) {
      // Fetch the audio file as a Blob using async/await
      const response = await fetch(postDetails.audio);
      if (!response.ok) throw new Error("Failed to fetch audio data");

      const audioBlob = await response.blob();
      formData.append("audio", audioBlob, "recording.wav");
    }

    const postResponse = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: formData,
    });

    if (!postResponse.ok) {
      const errorText = await postResponse.text();
      throw new Error(
        `HTTP error! Status: ${postResponse.status}. ${errorText}`
      );
    }

    const data = await postResponse.json();
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};



export const removePostFromServer = async (postId: string) => {
  try {
    const endpoint = `posts/${postId}`;
    const data = await fetchData(endpoint, "DELETE");
    return data;
  } catch (error) {
    console.error("Error deleting comment", error);
  }
};
