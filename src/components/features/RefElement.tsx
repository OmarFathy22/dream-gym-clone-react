import { createSlice } from "@reduxjs/toolkit";
const initialStateValue = false;
export const exerciseSlice = createSlice({
  name: "refElement",
  initialState: { value: initialStateValue },
  reducers: {
    refelement: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { refelement } = exerciseSlice.actions;
export default exerciseSlice.reducer;
