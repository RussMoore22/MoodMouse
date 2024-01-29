import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const checkinApi = createApi({
    reducerPath: 'checkinApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST
    }),
    endpoints: (builder) => ({
        getToken: builder.query({
            query: () => ({
                url: '/token',
                credentials: 'include' // send the cookies along along with request
            })
        })
    })
})

// export const {
//     useGetTokenQuery
// }
