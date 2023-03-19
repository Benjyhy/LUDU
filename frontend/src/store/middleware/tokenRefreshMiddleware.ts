import { Middleware } from '@reduxjs/toolkit';
import { EndpointDefinition, fetchBaseQuery } from '@reduxjs/toolkit/query';
import * as SecureStore from 'expo-secure-store';
import rootReducer from '../reducers/index';
import { emptySplitApi as api } from '../../services/LUDU_API/api';
import axios from 'axios';

type RootState = ReturnType<typeof rootReducer>;

type MiddlewareState = RootState & {
  api: {
    endpoints: any;
  };
};
export const tokenRefreshMiddleware: Middleware<any, MiddlewareState> = ({ dispatch }) => {
  return (next) => async (action) => {
    // Get the endpoint definition object for the action, if it exists
    const endpoint: EndpointDefinition<any, any, any, any, any> | undefined =
      action.meta?.arg?.endpointDefinition;

    if (
      endpoint &&
      ((endpoint.type === 'mutation' && endpoint.queryFn.name === 'login') ||
        endpoint.queryFn.name === 'refresh')
    ) {
      // If the action was a login or refresh request, do not refresh the token
      return next(action);
    }

    if (action.error) {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');

      if (refreshToken) {
        try {
          // const data = dispatch(api.endpoints.refresh.initiate);
          const data: any = await axios.get('http://localhost:3000/local/refresh', {
            headers: {
              Authorization: refreshToken,
            },
          });
          console.log(data);
          await SecureStore.setItemAsync('accessToken', data.accesToken);
          await SecureStore.setItemAsync('refreshToken', data.refreshToken);
          const retryAction = { ...action, originalArgs: { ...action.originalArgs } };
          return next(retryAction);
        } catch (error) {
          // If the token refresh failed, log the user out
          console.error('Token refresh failed', error);
          const logoutAction = api.endpoints.logout;
          return next(logoutAction);
        }
      } else {
        // If the refresh token is not available, log the user out
        console.error('Refresh token not available');
        const logoutAction = api.endpoints.logout;
        return next(logoutAction);
      }
    }

    return next(action);
  };
};
