import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const moodmouseApi = createApi({
    reducerPath: 'moodmouseApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: process.env.VITE_API_HOST
        baseUrl: 'http://localhost:8000',
    }),
    endpoints: (builder) => ({
        getToken: builder.query({
            query: () => ({
                url: '/token',
                credentials: 'include', // send the cookies along along with request
            }),
        }),
    }),
})

export const { useGetTokenQuery } = moodmouseApi
