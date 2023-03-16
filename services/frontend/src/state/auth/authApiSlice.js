import apiSlice from "state/api/apiSlice";
import { setCredentials } from "state/auth/authSlice";
import { logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    singleCodeLogin: builder.mutation({
      query: ({ email, type }) => ({
        url: "/auth/single-code-login",
        method: "POST",
        body: {
          email,
          type,
        },
      }),
    }),
    verifyCode: builder.mutation({
      query: ({ code }) => ({
        url: `/auth/verify-access-code`,
        method: "POST",
        body: {
          code,
        },
      }),
    }),
  }),
});

export const { useSingleCodeLoginMutation, useVerifyCodeMutation } = authApiSlice;
