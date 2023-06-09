import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/apis/api";

export const getSubjectInfo = createAsyncThunk(
  "instructorSubject/info",
  async (args: any, ThunkAPI) => {
    console.log(args);
    try {
      const { subjectId } = args;
      const state: any = ThunkAPI.getState();
      const response = await api.get(`/instructor/subjects/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (err: any) {
      console.log(err);
      ThunkAPI.rejectWithValue(
        err.data.message ? err.data.message : "something went wrong"
      );
    }
  }
);
