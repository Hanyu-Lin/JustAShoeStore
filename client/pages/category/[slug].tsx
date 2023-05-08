import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import { capital } from "@/utils/helpers";
import { Category, MetaData, ProductEntity } from "@/utils/type";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
const maxResult = 6;

interface CategoryProps {
  slug: string;
  products: ProductEntity[];
}
interface ApiResult {
  data: ProductEntity[];
  meta: MetaData;
}
const fetcher = (url: string) => fetchDataFromApi(url);

const CategoryPage = ({ slug, products }: CategoryProps) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { query } = useRouter();

  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  const { data, error, isLoading } = useSWR<ApiResult>(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetcher,
    {
      fallbackData: {
        data: products,
        meta: {
          pagination: {
            page: 1,
            pageSize: maxResult,
            pageCount: 1,
            total: products.length,
          },
        },
      },
    }
  );
  if (error) return <div>Error loading categories</div>;
  if (!data) return <div>Loading...</div>;
  const { data: productsList, meta } = data;
  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {capital(slug)}
          </div>
        </div>

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {productsList.map((product) => (
            <ProductCard key={product?.id} productData={product.attributes} />
          ))}
        </div>
        {/* products grid end

        {/* PAGINATION BUTTONS START */}
        {meta.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${
              data && data.meta.pagination.pageCount
            }`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export async function getStaticPaths() {
  const { data } = (await fetchDataFromApi("/api/categories?populate=*")) as {
    data: Category[];
  };

  const paths = data?.map((category) => ({
    params: {
      slug: category.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { data, meta } = (await fetchDataFromApi(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${params.slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`
  )) as { data: ProductEntity[]; meta: MetaData };

  return {
    props: {
      slug: params.slug,
      products: data,
    },
  };
}

export default CategoryPage;
