import {
  fetchApi,
  //  fetchFormData,
  requestMethods,
} from '../shared/utils/fetchFunctions';

const endpoints = { login: '/login' };

export async function login(email, password) {
  const tokenData = await fetchApi(endpoints.login, {
    method: requestMethods.post,
    body: { email, password },
  });
  const token = tokenData.data.token;
  localStorage.setItem('token', token);
  return token;
}
