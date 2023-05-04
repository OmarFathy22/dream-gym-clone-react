import { createSlice } from "@reduxjs/toolkit";
const initialStateValue = {};
export const exerciseSlice = createSlice({
  name: "exercise",
  initialState: { value: initialStateValue },
  reducers: {
    SelectedExercise: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { SelectedExercise } = exerciseSlice.actions;
export default exerciseSlice.reducer;
