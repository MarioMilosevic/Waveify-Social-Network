import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialUserState } from "../../utils/constants";
import { PostType, UserType } from "../../utils/types";

type UserState = {
  user: UserType;
};

type CommentActionPayload = {
  postId: string;
  action: "increment" | "decrement";
};

const initialState: UserState = {
  user: initialUserState,
};

const findUserPostById = (state: UserState, postId: string) => {
  return state.user.posts.find((post) => post.post_id === postId);
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setUserPosts: (state, action: PayloadAction<PostType[]>) => {
      state.user.posts = action.payload;
    },
    addUserPost: (state, action: PayloadAction<PostType>) => {
      state.user.posts.push(action.payload);
    },
    removeUserPost: (state, action: PayloadAction<string>) => {
      state.user.posts = state.user.posts.filter(
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

export const {
  setUser,
  setUserPosts,
  addUserPost,
  removeUserPost,
  toggleLike,
  updateComment,
} = userSlice.actions;

export default userSlice.reducer;
