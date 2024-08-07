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
    addComment: (state, action: PayloadAction<{ post_id: string; comment: CommentType }>) => {
      const { post_id, comment } = action.payload
      console.log(post_id)
      const post = state.user.posts.find((post) => post.post_id === post_id)
      console.log(post)
      // if(post) post.comments.push(comment)
      // i want to update user.post.comment.push(action.paylaod)
      // bassically i want to pass postId to find user.post, when i found it to push comment into it
    }
  },
});

export const { setUser, setUserPosts, addComment } = userSlice.actions;

export const findUserPost = (state:UserState, postId:string) => {
  return state.user.posts.find((post) => post.post_id === postId)
}

export default userSlice.reducer;

/**
 * posaljem komentar sa postId-jem
 * dobijem response da je dobro
 * treba da apdejtujem stejt userovih postova
 * treba da nadjem taj post, koristeci taj isti postId
 * nakon sto sam nasao da pusham ovaj komentar unutar njegovih postojecih komentara
 * i samim tim ce se sve renderovati
 */
