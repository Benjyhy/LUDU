import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// retrieve the authentication token from SecureStore or AsyncStorage
const getAuthToken = async () => {
  let token = await SecureStore.getItemAsync('authToken');
  if (!token) {
    token = await AsyncStorage.getItem('authToken');
  }
  return token;
};

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://13.39.77.202',
    prepareHeaders: async (headers) => {
      const token = await getAuthToken();
      if (token) {
        // update app state or navigate to authenticated screens
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
