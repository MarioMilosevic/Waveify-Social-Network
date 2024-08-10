import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialUserState } from "../../utils/constants";
import { PostType, UserType } from "../../utils/types";

type UserState = {
  user: UserType;
};

const initialState: UserState = {
  user: initialUserState,
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
    toggleLike: (state, action: PayloadAction<string>) => {
      const userPost = state.user.posts.find(
        (post) => post.post_id === action.payload
      );
      if (userPost) {
        userPost.liked = !userPost.liked;
        userPost.likes += userPost.liked ? 1 : -1;
      }
    },
  },
});

export const { setUser, setUserPosts, toggleLike } = userSlice.actions;

export default userSlice.reducer;
