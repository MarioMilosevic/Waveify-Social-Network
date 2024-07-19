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
  },
});

export const { setUser, setUserPosts } = userSlice.actions;

export default userSlice.reducer;
