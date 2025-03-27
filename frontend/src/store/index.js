import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { userId: "", IsLoggedIn: false },

  reducers: {
    login(state){
        state.IsLoggedIn = true;
    },
    logout(state){
        state.IsLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
