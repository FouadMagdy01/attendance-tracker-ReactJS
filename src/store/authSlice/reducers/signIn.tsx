import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { SignInData } from "../../../interfaces/signInData";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (signInData: SignInData, Thunk) => {
    const endPoint =
      signInData.authType === "Instructor"
        ? "/instructorAuth/login"
        : "/adminAuth/login";

    try {
      const response = await api.post(endPoint, {
        email: signInData.email,
        password: signInData.password,
      });

      const localTokenObject = {
        token: response.data.token,
        authType: signInData.authType,
      };
      localStorage.setItem("token", JSON.stringify(localTokenObject));
      return localTokenObject;
    } catch (err: any) {
      return Thunk.rejectWithValue(JSON.stringify(err.response));
    }
  }
);
