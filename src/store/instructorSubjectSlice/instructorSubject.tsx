import { createSlice } from "@reduxjs/toolkit";
import { getSubjectInfo } from "./reducers/getSubjectInfo";
import { getSubjectLectures } from "./reducers/getSubjectLectures";
import { createLecture } from "./reducers/createLecture";
import { getSubjectAttendance } from "./reducers/getSubjectAttendance";

interface stateTypes {
  info: any;
  lectures: any;
  attendance: any;
  err: Boolean | null;
  fetchingInfo: Boolean | null;
  fetchingLectures: Boolean | null;
  creatingLecture: Boolean;
  fetchingAttendance: Boolean | null;
  errMessage: "";
}

const initialState = {
  info: null,
  lectures: [],
  attendance: [],
  err: false,
  fetchingInfo: false,
  fetchingLectures: false,
  fetchingAttendance: false,
  creatingLecture: false,
  errMessage: "",
} as stateTypes;

const instructorSubjectSlice = createSlice({
  name: "instructorSubject",
  initialState,
  reducers: {
    resetData: (state, action) => {
      return {
        info: null,
        lectures: null,
        attendance: [],
        err: false,
        fetchingInfo: false,
        fetchingLectures: false,
        fetchingAttendance: false,
        creatingLecture: false,
        errMessage: "",
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getSubjectInfo.pending, (state, action) => {
      state.fetchingInfo = true;
      state.err = false;
    });
    builder.addCase(getSubjectInfo.rejected, (state, action) => {
      state.fetchingInfo = false;
      state.err = true;
    });
    builder.addCase(getSubjectInfo.fulfilled, (state, action) => {
      state.fetchingInfo = false;
      state.err = false;
      state.info = action.payload;
    });
    builder.addCase(getSubjectLectures.fulfilled, (state, action) => {
      state.lectures = action.payload;
      state.fetchingLectures = false;
      state.err = false;
    });
    builder.addCase(getSubjectLectures.pending, (state, payload) => {
      state.fetchingLectures = true;
      state.err = false;
    });
    builder.addCase(getSubjectLectures.rejected, (state, action) => {
      state.err = true;
      state.fetchingLectures = false;
    });
    builder.addCase(createLecture.pending, (state, action) => {
      state.creatingLecture = true;
      state.err = false;
    });
    builder.addCase(createLecture.fulfilled, (state, action) => {
      state.creatingLecture = false;
      state.err = false;
    });
    builder.addCase(getSubjectAttendance.fulfilled, (state, action) => {
      state.fetchingAttendance = false;
      state.err = false;
      state.attendance = action.payload;
    });
    builder.addCase(getSubjectAttendance.pending, (state, action) => {
      state.fetchingAttendance = true;
    });
  },
});

export const resetInstructorSubjectData =
  instructorSubjectSlice.actions.resetData;
export default instructorSubjectSlice.reducer;
