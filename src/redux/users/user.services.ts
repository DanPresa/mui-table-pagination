import clientApi from '../../config/clientApi';

export const fetchUserData = async (
  page?: number | undefined,
  limit?: number | undefined,
  sortBy?: string,
  order?: string
) => {
  let response;
  const sortParam = sortBy && order ? `&sortBy=${sortBy}&order=${order}` : '';

  if (page !== undefined && limit !== undefined) {
    response = await clientApi.get<UserData>(
      `/users?skip=${page * limit}&limit=${limit}${sortParam}`
    );
  } else {
    response = await clientApi.get<UserData>(`/users?limit=-1${sortParam}`);
  }

  return response;
};
