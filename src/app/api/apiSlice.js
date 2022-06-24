import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/accounts/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const user = getState().auth.user
        if (user) {
            headers.set("Authorization", `Bearer ${user.jwtToken}`)
        }
        return headers
    }
})



export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQuery,
    tagTypes: ['Product', 'Warehouse', 'Supply', 'Order', 'Account'],
    endpoints: builder => ({})
})