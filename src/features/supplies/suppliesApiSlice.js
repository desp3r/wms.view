import {apiSlice} from "../../app/api/apiSlice";

export const suppliesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSupplies: builder.query({
            query: () => ({
                url: '/Supplies/GetAll',
                method: 'GET'
            }),
            providesTags: ['Supply']
        }),

        getSupplyDetails: builder.query({
            query: (id) => ({
                url: `/Supplies/GetDetails/${id}`,
                method: 'GET'
            }),
            providesTags: ['Supply']
        }),

        createSupply: builder.mutation({
            query: (arg) => ({
                url: `/Supplies/Create`,
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ['Supply']
        }),

        updateSupply: builder.mutation({
            query: (arg) => ({
                url: `/Supplies/Update`,
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ['Supply']
        }),
        //
        // deleteProduct: builder.mutation({
        //     query: (id) => ({
        //         url: `/Products/Delete/${id}`,
        //         method: 'POST',
        //     }),
        //     invalidatesTags: ['Product']
        // }),
    })
})

export const {
    useGetSuppliesQuery,
    useGetSupplyDetailsQuery,
    useCreateSupplyMutation,
    useUpdateSupplyMutation,
} = suppliesApiSlice