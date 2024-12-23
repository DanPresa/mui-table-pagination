import { AppDispatch } from '../store';
import { RootState } from '../reducers';
import { fetchUserData } from './user.services';
import { setData, userSelector } from './users.slice';

export const getAllUsersPaginated =
  (page = 0, limit = 20) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { sortBy, order } = userSelector(getState());
      const { data } = await fetchUserData(page, limit, sortBy, order);

      dispatch(setData(data));
    } catch (error) {
      console.error(error);
    }
  };

export const getAllUsers = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await fetchUserData();

    dispatch(setData(data));
  } catch (error) {
    console.error(error);
  }
};
