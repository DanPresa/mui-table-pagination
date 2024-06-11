import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../reducers';

const initialUserState: UserState = {
  data: [],
  page: 0,
  limit: 20,
  totalRecords: 0,
  skip: 0,
};

const userSlice = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {
    setData: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload.users;
      state.totalRecords = action.payload.total - 1;
      // state.skip = action.payload.skip;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
});

export const userSelector = (state: RootState) => state.users;
export const { setData, setPage, setLimit } = userSlice.actions;
export default userSlice.reducer;
