import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import { useUserSlice } from "../../hooks/useUserSlice";
import { ToastContainer } from "react-toastify";
import Posts from "../../UI/Posts/Posts";
import MainContainer from "../../UI/MainContainer/MainContainer";
const Main = () => {
  const { user } = useUserSlice();
  console.log(user);
  return (
    <MainContainer>
      <NewPost />
      <Posts>
        {user.posts.map((post) => (
          <Post key={post.post_id} post={post} />
        ))}
      </Posts>
      <ToastContainer style={{ fontSize: "1.6rem" }} />
    </MainContainer>
  );
};

export default Main;
