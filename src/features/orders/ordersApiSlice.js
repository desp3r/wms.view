import {apiSlice} from "../../app/api/apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => ({
                url: '/Orders/GetAll',
                method: 'GET'
            }),
            providesTags: ['Order']
        }),

        getOrderDetails: builder.query({
            query: (id) => ({
                url: `/Orders/GetDetails/${id}`,
                method: 'GET'
            }),
            providesTags: ['Order']
        }),

        updateOrder: builder.mutation({
            query: (arg) => ({
                url: `/Orders/Update`,
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ['Order']
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
    useGetOrdersQuery,
    useGetOrderDetailsQuery,
    useUpdateOrderMutation,
} = ordersApiSlice