import {apiSlice} from "../../app/api/apiSlice";

export const warehouseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSlots: builder.query({
            query: () => ({
                url: '/Warehouse/GetAll',
                method: 'GET'
            }),
            providesTags: ['Warehouse']
        }),

        getSlotsByProduct: builder.query({
            query: (id) => ({
                url: `/Warehouse/GetByProduct/${id}`,
                method: 'GET'
            }),
            providesTags: ['Warehouse']
        }),

        getFreeSlotsByProduct: builder.query({
            query: (id) => ({
                url: `/Warehouse/GetFreeByProduct/${id}`,
                method: 'GET'
            }),
            providesTags: ['Warehouse']
        }),

        getSlotDetails: builder.query({
            query: (id) => ({
                url: `/Warehouse/GetDetails/${id}`,
                method: 'GET'
            }),
            providesTags: ['Warehouse']
        }),


        createSlot: builder.mutation({
            query: (arg) => ({
                url: `/Warehouse/Create`,
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ['Warehouse']
        }),

        updateSlot: builder.mutation({
            query: (arg) => ({
                url: `/Warehouse/Update`,
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ['Warehouse']
        }),

        deleteSlot: builder.mutation({
            query: (id) => ({
                url: `/Products/Delete/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Warehouse']
        }),

        getForTransfer: builder.query({
            query: (arg) => ({
                url: `/Warehouse/GetForTransfer/${arg.productId}/${arg.sourceId}`,
                method: 'GET'
            }),
            providesTags: ['Warehouse']
        }),

        transferProduct: builder.mutation({
            query: (arg) => ({
                url: `/Warehouse/ProductTransfer`,
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ['Warehouse']
        }),
    })
})

export const {
    useGetSlotsQuery,
    useGetSlotsByProductQuery,
    useGetFreeSlotsByProductQuery,
    useGetSlotDetailsQuery,
    useDeleteSlotMutation,
    useCreateSlotMutation,
    useUpdateSlotMutation,
    useGetForTransferQuery,
    useTransferProductMutation,
} = warehouseApiSlice