import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isDevelopmentEnv } from "utils/env";

const baseQuery = fetchBaseQuery({
  baseUrl: isDevelopmentEnv()
    ? process.env.REACT_APP_LOCALHOST_API_ENDPOINT
    : process.env.REACT_APP_INESC_API_ENDPOINT,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["Community"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
