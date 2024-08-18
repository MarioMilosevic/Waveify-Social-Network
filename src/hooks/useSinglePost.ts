import { useEffect, useState } from "react";
import { PostResponseType } from "../utils/types";
import { getPostInformation } from "../utils/api";
import { showToast } from "../utils/toasts";

export function useSinglePost(postId:string) {
  const [loading, setLoading] = useState(true);
  const [postDetails, setPostDetails] = useState<PostResponseType>();

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        const data = await getPostInformation(postId);
        setPostDetails(data);
      } catch (error) {
        console.error("Error fetching post comments:", error);
          showToast("Error getting user information", "error");

        throw error
      } finally {
        setLoading(false);
      }
    };

    fetchPostComments();
  }, [postId]);

  return {
    loading,
    postDetails,
    setPostDetails
  };
}



