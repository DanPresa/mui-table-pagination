import clientApi from '../../config/clientApi';

export const fetchUserData = async (
  page?: number | undefined,
  limit?: number | undefined
) => {
  let response;
  if (page !== undefined && limit !== undefined) {
    response = await clientApi.get<UserData>(
      `/users?skip=${page * limit}&limit=${limit}`
    );
  } else {
    response = await clientApi.get<UserData>(`/users?limit=-1`);
  }

  return response;
};
