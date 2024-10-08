import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import postsReducer from "../features/posts.Slice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts:postsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
