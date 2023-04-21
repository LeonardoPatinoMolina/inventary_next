import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const apiOperators = createApi({
  reducerPath: 'operatorsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/users/',method:'GET'}),
  endpoints: (builder)=>({
    getOperators: builder.query<any, any>({
      query: (args)=>''
    })
  })//end endpoints
});

export const { useGetOperatorsQuery } = apiOperators;