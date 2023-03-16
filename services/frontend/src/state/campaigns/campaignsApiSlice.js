import { createEntityAdapter } from "@reduxjs/toolkit";

import apiSlice from "../api/apiSlice";

const campaignsAdapter = createEntityAdapter({});

const initialState = campaignsAdapter.getInitialState({});

export const campaignsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: () => ({
        url: `/campaigns/`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result?.isError;
        },
      }),
      transformResponse: (responseData) => {
        if (responseData) {
          return campaignsAdapter.setAll(initialState, responseData);
        }
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Community", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Community", id })),
          ];
        } else return [{ type: "Community", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetCampaignsQuery } = campaignsApiSlice;

export const { selectAll: selectAllCampaigns } = campaignsAdapter.getSelectors();
