import { createSlice } from "@reduxjs/toolkit";
const initialStateValue = 'back'
export const exerciseSlice = createSlice({
  name:"exerciseomar",
  initialState:{value:initialStateValue},
  reducers:{
      EXERCISENAME:(state , action)=>{
      state.value = action.payload;
    },
     
  }
})
export const {EXERCISENAME} = exerciseSlice.actions;
export default exerciseSlice.reducer;