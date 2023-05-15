import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubject } from "./reducers/getSubject";
import { acceptStudent } from "./reducers/acceptStudent";
import { rejectStudent } from "./reducers/rejectStudent";

interface stateTypes {
  isLoading?: any;
  subjectObject?: any;
  err?: Boolean;
}

const initialState = {
  isLoading: false,
  subjectObject: null,
  err: false,
} as stateTypes;

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    clearSubjectDetails: (state, action) => {
      return {
        isLoading: false,
        subjectObject: null,
        err: false,
      };
    },
  },

  extraReducers(builder) {
    builder.addCase(getSubject.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getSubject.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.subjectObject = payload;
    });
    builder.addCase(getSubject.rejected, (state, action) => {
      state.isLoading = false;
      state.err = true;
    });

    builder.addCase(acceptStudent.fulfilled, (state, action) => {
      const { studentId, subjectId } = action.payload;
      const student = state.subjectObject.students.pending.find(
        (student: any) => student._id === studentId
      );
      const updatedAcceptedStudents = [
        ...state.subjectObject.students.accepted,
        student,
      ];
      const updatedPendingStudents =
        state.subjectObject.students.pending.filter(
          (student: any) => student._id != studentId
        );
      state.subjectObject.students.accepted = updatedAcceptedStudents;
      state.subjectObject.students.pending = updatedPendingStudents;
    });

    builder.addCase(rejectStudent.fulfilled, (state, action) => {
      const studentId = action.payload.studentId;
      console.log(studentId);
      const updatedPendingStudents =
        state.subjectObject.students.pending.filter(
          (student: any) => student._id != studentId
        );
      state.subjectObject.students.pending = updatedPendingStudents;
    });
  },
});

export const clearSubjectDetails = subjectSlice.actions.clearSubjectDetails;
export default subjectSlice.reducer;
