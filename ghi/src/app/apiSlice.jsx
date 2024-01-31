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
        getImages: builder.query({
            query: () => ({
                url: '/api/rorschach_imgs',
                credentials: 'include',
            })
        }),
        getQuestion: builder.query({
            query: (question_id) => ({
                url: '/api/questions/{question_id}',
                credentials: 'include',
            })
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
        }),
        createCheckin: builder.mutation({
            query: (info) => {
                const data = {}
                data['date'] = info.date
                data['updated_date'] = info.updatedDate
                data['happy_level'] = info.happyLevel
                data['journal_entry'] = info.journalEntry
                data['survey'] = info.survey
                data['rorscach_test'] = info.rorscachTest

                return {
                    url: '/api/checkins',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                }
            }
        }),
        createSurvey: builder.mutation({
            query: (info) => {
                const data = {}
                data['q1'] = info.q1
                data['q1_ans'] = info.q1Ans
                data['q2'] = info.q2
                data['q2_ans'] = info.q2Ans
                data['q3'] = info.q3
                data['q3_ans'] = info.q3Ans
                data['q4'] = info.q4
                data['q4_ans'] = info.q4Ans
                data['q5'] = info.q5
                data['q5_ans'] = info.q5Ans

                return {
                    url: '/api/surveys',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                }
            }
        }),
        createRorschachTest: builder.mutation({
            query: (info) => {
                const data = {}
                data['image'] = info.image
                data['response'] = info.response

                return {
                    url: '/api/rorschach_tests',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                }
            }
        }),

    })
})

export const {
    useGetTokenQuery,
    useLogoutMutation,
    useLoginMutation,
    useSignupMutation,
    useCreateCheckinMutation,
    useCreateRorschachTestMutation,
    useCreateSurveyMutation,
    useGetImagesQuery,
    useGetQuestionQuery,
} = moodmouseApi
