import console from "console-browserify";
import { createEntityAdapter } from "@reduxjs/toolkit";

import apiSlice from "../api/apiSlice";

const communitiesAdapter = createEntityAdapter({});

const initialState = communitiesAdapter.getInitialState({});

export const communitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommunities: builder.query({
      query: () => ({
        url: `/communities/`,
        validateStatus: (response, result) => {
          console.log(response);
          return response.status === 200 && !result?.isError;
        },
      }),
      transformResponse: (responseData) => {
        console.log(responseData);
        if (responseData) {
          return communitiesAdapter.setAll(initialState, responseData);
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

export const { useGetCommunitiesQuery } = communitiesApiSlice;

export const { selectAll: selectAllCommunities } = communitiesAdapter.getSelectors();
