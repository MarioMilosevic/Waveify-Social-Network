import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialUserState } from "../../utils/constants";
import { CommentType, PostType, UserType } from "../../utils/types";

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
    // addComment: (state, action:PayloadAction<{postId:string, comment:CommentType}>) => {
    //   const currentPost = state.user.posts.find((post) => post.post_id === action.payload.postId)
    //   currentPost?.comments.push(action.payload.comment)
    // }
  },
});

export const { setUser, setUserPosts } = userSlice.actions;

// export const findUserPost = (state:UserState, postId:string) => {
//   return state.user.posts.find((post) => post.post_id === postId)
// }

export default userSlice.reducer;

/**
 * posaljem komentar sa postId-jem
 * dobijem response da je dobro
 */
