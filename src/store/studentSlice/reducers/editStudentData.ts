import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/apis/api";
import { displayMessage } from "../../messageSlice/message";

export const editStudentData = createAsyncThunk(
  "admin/students/editStudent",
  async (args: any, ThunkAPI) => {
    const state: any = ThunkAPI.getState();
    console.log(args);
    try {
      const response = await api.post("/admin/students/edit", args, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      ThunkAPI.dispatch(
        displayMessage({
          type: "success",
          context: "Student Data was updated successfully",
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
