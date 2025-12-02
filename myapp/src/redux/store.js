import { configureStore } from "@reduxjs/toolkit";
import singerSlice from "./singerSlice";
import authReducer from "./authSlice";
import themeslice from "./themeSlice"
export const store = configureStore({
  reducer: {
    music: singerSlice,
    auth: authReducer,
    theme:themeslice,
  },
});
