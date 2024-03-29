import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const VITE_API_URL = import.meta.env.VITE_API_HOST

export const moodmouseApi = createApi({
    reducerPath: 'moodmouseApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: process.env.VITE_API_HOST
        baseUrl: VITE_API_URL,
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
            }),
        }),
        getQuestion: builder.query({
            query: (question_id) => ({
                url: `/api/questions/${question_id}`,
                credentials: 'include',
            }),
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
                data['happy_level'] = info.happyLevel
                data['journal_entry'] = info.journalEntry
                data['survey'] = info.survey
                data['rorschach_test'] = info.rorschachTest
                return {
                    url: '/api/check-ins',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Checkins'],
        }),
        createSurvey: builder.mutation({
            query: (info) => {
                const data = {}
                data['q1'] = info.q1q
                data['q1_ans'] = info.q1Ans
                data['q2'] = info.q2q
                data['q2_ans'] = info.q2Ans
                data['q3'] = info.q3q
                data['q3_ans'] = info.q3Ans
                data['q4'] = info.q4q
                data['q4_ans'] = info.q4Ans
                data['q5'] = info.q5q
                data['q5_ans'] = info.q5Ans
                return {
                    url: '/api/surveys',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Checkins'],
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
            },
            invalidatesTags: ['Checkins'],
        }),

        getAllCheckins: builder.query({
            query: () => ({
                url: '/api/check-ins/mine',
                credentials: 'include',
            }),
            providesTags: ['Checkins'],
        }),

        getOneCheckin: builder.query({
            query: (checkin_id) => {
                return {
                    url: `/api/check-ins/${checkin_id}`,
                    credentials: 'include',
                }
            },
            providesTags: ['Checkins'],
        }),

        editOneCheckin: builder.mutation({
            query: (info) => {
                const data = {}
                data['happy_level'] = info.happyLevel
                data['journal_entry'] = info.journalEntry
                data['survey'] = info.survey
                data['rorschach_test'] = info.rorschachTest
                return {
                    url: `/api/check-ins/${info.checkin_id}`,
                    method: 'PUT',
                    body: data,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Checkins'],
        }),

        editOneSurvey: builder.mutation({
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
                    url: `/api/surveys/${info.survey_id}`,
                    method: 'PUT',
                    body: data,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Checkins'],
        }),

        editOneRorschachTest: builder.mutation({
            query: (info) => {
                const data = {}
                data['image'] = info.image
                data['response'] = info.response

                return {
                    url: `/api/rorschach_tests/${info.rorschach_id}`,
                    method: 'PUT',
                    body: data,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Checkins'],
        }),

        deleteCheckin: builder.mutation({
            query: (info) => {
                return {
                    url: `/api/check-ins/${info.checkin_id}`,
                    method: 'DELETE',
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Checkins'],
        }),
    }),
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
    useGetAllCheckinsQuery,
    useGetOneCheckinQuery,
    useEditOneCheckinMutation,
    useEditOneSurveyMutation,
    useEditOneRorschachTestMutation,
    useDeleteCheckinMutation,
} = moodmouseApi
