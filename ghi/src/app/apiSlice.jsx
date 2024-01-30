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
            providesTags: ['Account'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Account'],
        }),
        login: builder.mutation({
            query: (info) => {
                const formData = new FormData()
                formData.append('username', info.username)
                formData.append('password', info.password)
                return {
                    url: '/token',
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Account'],
        }),
        signup: builder.mutation({
            query: (info) => {
                const data = {}
                data['first_name'] = info.firstName
                data['last_name'] = info.lastName
                data['email'] = info.email
                data['username'] = info.username
                data['password'] = info.password

                return {
                    url: '/api/accounts',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Account'],
        })
    }),
})

export const { useGetTokenQuery, useLogoutMutation, useLoginMutation, useSignupMutation } =
    moodmouseApi
