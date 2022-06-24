import {apiSlice} from "../../app/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: '/Products/GetAll',
                method: 'GET'
            }),
            providesTags: ['Product']
        }),

        getProductDetails: builder.query({
            query: (id) => ({
                url: `/Products/GetDetails/${id}`,
                method: 'GET'
            }),
            providesTags: ['Product']
        }),

        createProduct: builder.mutation({
            query: (arg) => ({
                url: `/Products/Create`,
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ['Product']
        }),

        updateProduct: builder.mutation({
            query: (arg) => ({
                url: `/Products/Update`,
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ['Product']
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/Products/Delete/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Product']
        }),

    })
})

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApiSlice