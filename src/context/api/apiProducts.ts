import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const apiProducts = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/users/',method:'GET'}),
  endpoints: (builder)=>({
    getProducts: builder.query<any, any>({
      query: (args)=>''
    })
  })//end endpoints
});

export const { useGetProductsQuery } = apiProducts;