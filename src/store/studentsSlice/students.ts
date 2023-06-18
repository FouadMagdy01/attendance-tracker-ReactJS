import { createSlice } from "@reduxjs/toolkit";
import { registerStudent } from "./reducers/registerStudent";

interface stateTypes {
  loading?: any;
  err?: any;
}

const studentsSlice = createSlice({
  name: "studentsSlice",
  initialState: {
    loading: false,
    err: false,
  } as stateTypes,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerStudent.pending, (state, action) => {
      state.loading = true;
      state.err = false;
    });
    builder.addCase(registerStudent.rejected, (state, action) => {
      state.loading = false;
      state.err = true;
    });
    builder.addCase(registerStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.err = false;
    });
  },
});

export default studentsSlice.reducer;
