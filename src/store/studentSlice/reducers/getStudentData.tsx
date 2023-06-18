import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/apis/api";
import { displayMessage } from "../../messageSlice/message";

export const getStudentData = createAsyncThunk(
  "admin/students/getStudent",
  async (args: any, ThunkAPI) => {
    const { studentId } = args;
    const state: any = ThunkAPI.getState();
    try {
      const response = await api.get(`/admin/students/${studentId}`, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
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
