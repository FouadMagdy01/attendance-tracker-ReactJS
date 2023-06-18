import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/apis/api";
import { displayMessage } from "../../messageSlice/message";

export const deleteStudent = createAsyncThunk(
  "/admin/students/delete",
  async (args: any, ThunkAPI) => {
    const { studentId } = args;
    const state: any = ThunkAPI.getState();
    try {
      const response = await api.delete("/admin/students/delete", {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
        data: {
          studentId,
        },
      });
      ThunkAPI.dispatch(
        displayMessage({
          type: "success",
          context: response.data.message,
        })
      );
      return response.data;
    } catch (err: any) {
      ThunkAPI.dispatch(
        displayMessage({
          type: "error",
          context: "something went wrong while fetching student details",
        })
      );
      ThunkAPI.rejectWithValue(
        err.data.message ? err.data.message : "Something wen wrong"
      );
    }
  }
);
