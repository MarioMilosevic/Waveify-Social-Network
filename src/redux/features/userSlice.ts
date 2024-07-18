import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialUserState } from "../../utils/constants";
import { UserType } from "../../utils/types";

const initialState = {
  user: initialUserState,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
