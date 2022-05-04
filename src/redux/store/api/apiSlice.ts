import { API_BASE } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
// eslint-disable-next-line import/prefer-default-export
export const apiSlice = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: () => ({}),
});
