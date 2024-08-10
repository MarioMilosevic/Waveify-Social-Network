import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialUserState } from "../../utils/constants";
import { PostType, UserType, CommentType } from "../../utils/types";

type UserState = {
  user: UserType;
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
    toggleLike: (state, action: PayloadAction<string>) => {
      const userPost = findUserPostById(state, action.payload);
      if (userPost) {
        userPost.liked = !userPost.liked;
        userPost.likes += userPost.liked ? 1 : -1;
      }
    },
    addComment: (
      state,
      action: PayloadAction<string>
    ) => {
      const userPost = findUserPostById(state, action.payload);
      if (userPost) {
        userPost.comments++;
      }
    },
    removeComment: (state, action:PayloadAction<string>) => {
      const userPost = findUserPostById(state, action.payload)
      if (userPost) {
        userPost.comments--
      }
    }
  },
});

export const { setUser, setUserPosts, toggleLike, addComment, removeComment } =
  userSlice.actions;

export default userSlice.reducer;
