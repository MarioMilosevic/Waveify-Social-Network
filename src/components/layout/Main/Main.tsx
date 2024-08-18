import { ToastContainer } from "react-toastify";
import Post from "../Post/Post";
import NewPost from "../NewPost/NewPost";
import Posts from "../Posts/Posts";
import MainContainer from "../MainContainer/MainContainer";
import { usePostsSlice } from "../../../hooks/usePostsSlice";
import Footer from "../Footer/Footer";
const Main = () => {
  const { posts } = usePostsSlice();
  return (
    <MainContainer>
      <NewPost />
      <Posts>
        {posts.map((post) => (
          <Post key={post.post_id} post={post} />
        ))}
      </Posts>
      <Footer/>
      <ToastContainer style={{ fontSize: "1.6rem" }} />
    </MainContainer>
  );
};

export default Main;
