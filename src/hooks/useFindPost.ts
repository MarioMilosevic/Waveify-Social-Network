import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { findUserPost } from "../redux/features/userSlice";

const useFindPost = (postId: string) => {
  const foundPost = useSelector((state: RootState) =>
    findUserPost(state.user, postId)
  );
  return foundPost;
};

export default useFindPost;
