import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiOperators = createApi({
  reducerPath: 'operatorsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/api/operator/all',method:'GET'}),
  endpoints: (builder)=>({
    getOperators: builder.query<any, any>({
      query: ()=>''
    })
  })//end endpoints
});

export const { useGetOperatorsQuery } = apiOperators;