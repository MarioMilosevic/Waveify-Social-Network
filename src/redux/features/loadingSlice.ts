import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { initialUserState } from "../../utils/constants";
// import { PostType, UserType } from "../../utils/types";

type LoadingState = {
  loading: boolean;
};

const initialState: LoadingState = {
  loading: true,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action:PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
