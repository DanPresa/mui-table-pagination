import { AppDispatch } from '../store';
import { fetchUserData } from './user.services';
import { setData } from './users.slice';

export const getAllUsersPaginated =
  (page = 0, limit = 5) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await fetchUserData(page, limit);
      console.log(data);

      dispatch(setData(data));
    } catch (error) {
      console.error(error);
    }
  };

export const getAllUsers = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await fetchUserData();
    console.log(data);

    dispatch(setData(data));
  } catch (error) {
    console.error(error);
  }
};
