import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducer from './reducers';
import { emptySplitApi as api } from '../services/LUDU_API/api';
import { tokenRefreshMiddleware } from './middleware/tokenRefreshMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware,
    tokenRefreshMiddleware,
  ],
  devTools: true,
});
setupListeners(store.dispatch);

export default store;
