import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    userDataList: [], // Initialize userDataList to an empty array
  },
  reducers: {
    UserData: (state, action) => {
      state.userDataList.push(action.payload);
    },
  },
});


export const { UserData } = counterSlice.actions;
export default counterSlice.reducer;
