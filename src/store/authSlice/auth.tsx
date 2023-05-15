import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./reducers/signIn";
const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    token: null,
    isFetchingLocalToken: true,
    authType: null,
    err: false,
    signingIn: false,
  },
  reducers: {
    signOut: (state, action) => {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        authType: null,
      };
    },

    fetchLocalToken: (state, action) => {
      const localTokenObject = localStorage.getItem("token");
      if (localTokenObject) {
        const parsedToken = JSON.parse(localTokenObject);
        return {
          token: parsedToken.token,
          authType: parsedToken.authType,
          err: false,
          signingIn: false,
          isFetchingLocalToken: false,
        };
      }
      return {
        ...state,
        isFetchingLocalToken: false,
      };
    },
  },

  extraReducers(builder) {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.authType = action.payload.authType;
      state.signingIn = false;
      state.err = false;
    });

    builder.addCase(signIn.rejected, (state, action: any) => {
      state.err = true;
      state.signingIn = false;
    });
    builder.addCase(signIn.pending, (state, action) => {
      state.signingIn = true;
    });
  },
});

export const signOut = authSlice.actions.signOut;
export const fetchLocalToken = authSlice.actions.fetchLocalToken;

export default authSlice.reducer;
