import { useEffect, useState } from "react";
import { PostResponseType } from "../utils/types";
import { getPostInformation } from "../utils/api";

export function useSinglePost(postId:string) {
  const [loading, setLoading] = useState(true);
  const [postDetails, setPostDetails] = useState<PostResponseType | undefined>();

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        const data = await getPostInformation(postId);
        setPostDetails(data);
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
    setPostDetails
  };
}



