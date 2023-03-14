import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { load, save } from "redux-localstorage-simple";

import { isDevelopmentEnv } from "utils/env";

// Slices
import apiSlice from "state/api/apiSlice";
import authReducer from "state/auth/authSlice";
import connectionReducer from "./connection/connectionSlice";

const PERSISTED_KEYS = [];

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  connection: connectionReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true, serializableCheck: false })
      .concat(apiSlice.middleware)
      .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: isDevelopmentEnv() }),
  devTools: isDevelopmentEnv(),
});

export default store;
