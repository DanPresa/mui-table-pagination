import { combineReducers } from '@reduxjs/toolkit';
import users from './users/users.slice';

const rootReducer = combineReducers({
  users,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
