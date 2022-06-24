import { apiSlice } from "../../app/api/apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAccounts: builder.query({
            query: () => ({
                url: '/Accounts/GetAll',
                method: 'GET'
            }),
            providesTags: ['Account']
        }),

        getAccountDetails: builder.query({
            query: (id) => ({
                url: `/Accounts/GetById/${id}`,
                method: 'GET'
            }),
            providesTags: ['Account']
        }),

        createAccount: builder.mutation({
            query: (arg) => ({
                url: `/Accounts/Create`,
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ['Account']
        }),

        updateAccount: builder.mutation({
            query: (arg) => ({
                url: `/Accounts/Update`,
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ['Account']
        }),

        deleteAccount: builder.mutation({
            query: (id) => ({
                url: `/Accounts/Delete/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Account']
        }),
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
    useGetAccountsQuery,
    useGetAccountDetailsQuery,
    useCreateAccountMutation,
    useUpdateAccountMutation,
    useDeleteAccountMutation,
    useLoginMutation
} = accountApiSlice