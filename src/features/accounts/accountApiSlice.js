import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (arg) => ({
                url: '/Accounts/Authenticate',
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ['Account']
        }),
    })
})

export const {
    useLoginMutation
} = authApiSlice