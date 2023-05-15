import { createSlice } from "@reduxjs/toolkit";

const instructorSubjectSlice = createSlice({
  name: "instructorSubject",

  initialState: {
    info: null,
    lectures: null,
    attendance: null,
    loading: false,
    err: false,
  },
  reducers: {},
  extraReducers(builder) {},
});

export default instructorSubjectSlice.reducer;
