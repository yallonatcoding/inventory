import { nextApi } from '@/shared/lib/base-api';
import { Product, CreateProductDTO } from '@repo/features/products';

export const productsApi = nextApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['Product'],
    }),

    createProduct: builder.mutation<Product, CreateProductDTO>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
} = productsApi;