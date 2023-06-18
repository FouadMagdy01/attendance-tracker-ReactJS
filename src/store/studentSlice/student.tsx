import { createSlice } from "@reduxjs/toolkit";
import { getStudentData } from "./reducers/getStudentData";
import { editStudentData } from "./reducers/editStudentData";
import { deleteStudent } from "./reducers/deleteStudent";

interface stateType {
  studentDetails?: any;
  err?: any;
  loading?: any;
  isMakingOperation?: any;
  makingOperationErr?: any;
}
const studentSlice = createSlice({
  name: "studentSlice",
  initialState: {
    studentDetails: {},
    err: false,
    loading: false,
    isMakingOperation: false,
    makingOperationErr: false,
  } as stateType,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getStudentData.fulfilled, (state, action) => {
      state.studentDetails = action.payload;
      state.err = false;
      state.loading = false;
    });
    builder.addCase(getStudentData.pending, (state, action) => {
      state.loading = true;
      state.err = false;
    });
    builder.addCase(getStudentData.rejected, (state, action) => {
      state.loading = false;
      state.err = true;
    });
    builder.addCase(editStudentData.pending, (state, action) => {
      state.makingOperationErr = false;
      state.isMakingOperation = true;
    });
    builder.addCase(editStudentData.rejected, (state, action) => {
      state.makingOperationErr = true;
      state.isMakingOperation = false;
    });
    builder.addCase(editStudentData.fulfilled, (state, action) => {
      state.makingOperationErr = false;
      state.isMakingOperation = false;
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.makingOperationErr = false;
      state.isMakingOperation = false;
    });
    builder.addCase(deleteStudent.pending, (state, action) => {
      state.makingOperationErr = false;
      state.isMakingOperation = true;
    });
    builder.addCase(deleteStudent.rejected, (state, action) => {
      state.makingOperationErr = true;
      state.isMakingOperation = false;
    });
  },
});

export default studentSlice.reducer;
