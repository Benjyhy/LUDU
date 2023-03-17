import { Middleware } from '@reduxjs/toolkit';
import { EndpointDefinition } from '@reduxjs/toolkit/query';
import * as SecureStore from 'expo-secure-store';
import rootReducer from '../reducers/index';
import { extendedApi } from '../../services/LUDU_API/auth';

type RootState = ReturnType<typeof rootReducer>;

type MiddlewareState = RootState & {
  api: {
    endpoints: any;
  };
};

export const tokenRefreshMiddleware: Middleware<any, MiddlewareState> = ({ getState }) => {
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
          const data = await extendedApi.endpoints.refresh.initiate({ refreshToken });
          console.log(data);
          await SecureStore.setItemAsync('accessToken', data.token);
          const retryAction = { ...action, originalArgs: { ...action.originalArgs } };
          return next(retryAction);
        } catch (error) {
          // If the token refresh failed, log the user out
          console.error('Token refresh failed', error);
          const logoutAction = extendedApi.endpoints.logout;
          return next(logoutAction);
        }
      } else {
        // If the refresh token is not available, log the user out
        console.error('Refresh token not available');
        const logoutAction = extendedApi.endpoints.logout;
        return next(logoutAction);
      }
    }

    return next(action);
  };
};
