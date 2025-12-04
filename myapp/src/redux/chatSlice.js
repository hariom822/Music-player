
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: []
  },

  reducers: {
    storeMessage: (state, action) => {
      state.messages.push(action.payload); 
    }
  }
});

export const { storeMessage } = chatSlice.actions;
export default chatSlice.reducer;
