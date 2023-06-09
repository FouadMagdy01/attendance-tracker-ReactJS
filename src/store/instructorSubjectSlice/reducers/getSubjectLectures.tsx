import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/apis/api";

export const getSubjectLectures = createAsyncThunk(
  "instructorSubject/getLectures",
  async (args: any, ThunkAPI) => {
    const state: any = ThunkAPI.getState();
    const { subjectId } = args;
    try {
      const response = await api.get(
        `instructor/subjects/${subjectId}/lectures  `,
        {
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      ThunkAPI.rejectWithValue(
        err.data.message ? err.data.message : "something went wrong"
      );
    }
  }
);
