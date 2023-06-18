import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/apis/api";
import { displayMessage } from "../../messageSlice/message";

export const registerStudent = createAsyncThunk(
  "/admin/students/register",
  async (args: any, ThunkAPI) => {
    const state: any = ThunkAPI.getState();
    try {
      const response = await api.post("/admin/students/register", args, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      ThunkAPI.dispatch(
        displayMessage({
          type: "success",
          context: "Student have been registered successfully",
        })
      );
      return response.data;
    } catch (err: any) {
      ThunkAPI.dispatch(
        displayMessage({
          type: "error",
          context:
            "something went wrong while registering student from excel sheet",
        })
      );
      ThunkAPI.rejectWithValue(
        err.data.message ? err.data.message : "Something wen wrong"
      );
    }
  }
);
