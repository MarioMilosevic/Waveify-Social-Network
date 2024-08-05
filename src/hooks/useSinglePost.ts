import { useEffect, useState } from "react";
import { PostResponseType } from "../utils/types";
import { getPostComments } from "../utils/helperFunction";

export function useSinglePost(postId:string) {
  const [loading, setLoading] = useState(true);
  const [postDetails, setPostDetails] = useState<PostResponseType>();

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        const response = await getPostComments(postId);
        setPostDetails(response);
      } catch (error) {
        console.error("Error fetching post comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostComments();
  }, [postId]);

  return {
    loading,
    postDetails,
  };
}


