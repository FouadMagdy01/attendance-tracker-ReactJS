import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { displayMessage } from "../../messageSlice/message";

export const createLecture = createAsyncThunk(
  "instructorSubject/lectures",
  async (args: any, ThunkAPI) => {
    const state: any = ThunkAPI.getState();

    try {
      const response = await api.post(
        "/instructor/createLecture",
        {
          type: args.type,
          date: args.date,
          subjectId: args.subjectId,
          name: args.name,
          location: args.location,
        },
        {
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
          },
        }
      );
      ThunkAPI.dispatch(
        displayMessage({
          type: "success",
          context: "Lecture created successfully",
        })
      );
      return response.data;
    } catch (err: any) {
      ThunkAPI.dispatch(
        displayMessage({
          type: "error",
          context: "something went wrong while trying to add lecture",
        })
      );
      return err.data.message ? err.data.message : "Something wen wrong";
    }
  }
);
