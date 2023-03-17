import apiSlice from "state/api/apiSlice";
import { setCredentials } from "state/auth/authSlice";
import { logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendCode: builder.mutation({
      query: ({ email }) => ({
        url: "/users/send-code/",
        method: "POST",
        body: {
          email,
        },
      }),
    }),
    verifyCode: builder.mutation({
      query: ({ email, code }) => ({
        url: `/users/verify-code/?email=${email}&code=${code}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useSendCodeMutation, useVerifyCodeMutation } = authApiSlice;
