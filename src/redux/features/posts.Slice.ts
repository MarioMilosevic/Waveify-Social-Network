import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType, PostsState, CommentActionPayload } from "../../utils/types";

const initialState: PostsState = {
  posts: [],
};

const findUserPostById = (state: PostsState, postId: string) => {
  return state.posts.find((post) => post.post_id === postId);
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<PostType>) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(
        (post) => post.post_id !== action.payload
      );
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const userPost = findUserPostById(state, action.payload);
      if (userPost) {
        userPost.liked = !userPost.liked;
        userPost.likes += userPost.liked ? 1 : -1;
      }
    },
    updateComment: (state, action: PayloadAction<CommentActionPayload>) => {
      const { postId, action: commentAction } = action.payload;
      const userPost = findUserPostById(state, postId);
      if (userPost) {
        userPost.comments += commentAction === "increment" ? 1 : -1;
      }
    },
  },
});

export const { setPosts, addPost, removePost, toggleLike, updateComment } =
  postsSlice.actions;

export default postsSlice.reducer;
