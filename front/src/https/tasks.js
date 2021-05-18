import {
  fetchApi,
  fetchFormData,
  requestMethods,
} from '../shared/utils/fetchFunctions';
const endpoints = {
  getAllPacks: '/packs',
};

export async function getAllPacks() {
  const response = await fetchApi(`${endpoints.getAllPacks}`, {
    method: requestMethods.get,
  });
  if (response.status === 'ok') {
    return response.data;
  }
  console.log(response);
}
