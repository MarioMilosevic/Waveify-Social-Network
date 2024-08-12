import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

export const usePostsSlice = () => {
  const posts = useSelector((state: RootState) => state.posts);
  return posts;
};
