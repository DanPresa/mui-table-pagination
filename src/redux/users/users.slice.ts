import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../reducers';

const initialUserState: UserState = {
  data: [],
  page: 0,
  limit: 20,
  totalRecords: 0,
  skip: 0,
  sortBy: 'id',
  order: 'asc',
};

const userSlice = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {
    setData: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload.users;
      state.totalRecords = action.payload.total;
      // state.skip = action.payload.skip;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setSortBy: (state, action: PayloadAction<keyof User>) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.order = action.payload;
    },
  },
});

export const userSelector = (state: RootState) => state.users;
export const { setData, setPage, setLimit, setSortBy, setOrder } =
  userSlice.actions;
export default userSlice.reducer;
