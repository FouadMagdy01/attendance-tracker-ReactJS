import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/apis/api";

export const getSubject = createAsyncThunk(
  "subject/getSubject",
  async (args: any, ThunkAPI) => {
    const state: any = ThunkAPI.getState();
    try {
      const url = `/admin/subjects/${args.id}`;
      const res = await api.get(url, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      });
      return res.data;
    } catch (err) {
      return ThunkAPI.rejectWithValue(err);
    }
  }
);
