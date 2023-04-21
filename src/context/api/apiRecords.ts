import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const apiRecords = createApi({
  reducerPath: 'recordsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/users/',method:'GET'}),
  endpoints: (builder)=>({
    getRecords: builder.query<any, any>({
      query: (args)=>''
    })
  })//end endpoints
});

export const { useGetRecordsQuery } = apiRecords;