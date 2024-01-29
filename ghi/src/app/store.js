import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// import queryReducer from './querySlice'
import { moodmouseApi } from './apiSlice'

export const store = configureStore({
    reducer: {
        // query: queryReducer,
        [moodmouseApi.reducerPath]: moodmouseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moodmouseApi.middleware),
})

setupListeners(store.dispatch)
