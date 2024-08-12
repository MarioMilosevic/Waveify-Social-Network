import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import { ToastContainer } from "react-toastify";
import Posts from "../../UI/Posts/Posts";
import MainContainer from "../../UI/MainContainer/MainContainer";
import { usePostsSlice } from "../../hooks/usePostsSlice";
const Main = () => {
  const { posts } = usePostsSlice()
  // console.log(posts)
  return (
    <MainContainer>
      <NewPost />
      <Posts>
        {posts.map((post) => (
          <Post key={post.post_id} post={post} />
        ))}
      </Posts>
      <ToastContainer style={{ fontSize: "1.6rem" }} />
    </MainContainer>
  );
};

export default Main;
