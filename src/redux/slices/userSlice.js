import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: '',
  signUp: [],
  error: null,
  isAuthenticated: false,
  userRole: null, 
};


const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      localStorage.setItem("userAuth", JSON.stringify(action.payload));
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    loginInfo: (state, action) => {
      state.login = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("userAuth", JSON.stringify(state.isAuthenticated));
    },
    logOut: (state) => {
      state.login = '';
      state.isAuthenticated = false;
      state.userRole = null; 
      localStorage.setItem("userAuth", JSON.stringify(state.isAuthenticated));
    },
    signUpInfo: (state, action) => {
      const existingUser = state.signUp.find(
        (user) => user.email === action.payload.email
      );

      if (existingUser) {
        state.error = "Email already exists";
      } else {
        state.signUp.push(action.payload);
        state.error = null;
      }
    },
    updateUserDetails: (state, action) => {
    
      state.login = action.payload;
    },
  },
});

export const {
  loginInfo,
  signUpInfo,
  logOut,
  updateUserDetails,
  setIsAuthenticated,
  setUserRole, 
} = userSlice.actions;
export default userSlice.reducer;
