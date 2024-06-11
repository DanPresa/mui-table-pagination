import { AppDispatch } from '../store';
import { fetchUserData } from './user.services';
import { setData } from './users.slice';

export const getAllUsersPaginated =
  (page = 0, limit = 20) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await fetchUserData(page, limit);

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
