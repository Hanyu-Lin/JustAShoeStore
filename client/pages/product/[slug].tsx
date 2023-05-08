import Image from "next/image";
import Wrapper from "@/components/Wrapper";

import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDiscountedPricePercentage } from "@/utils/helpers";
import { fetchDataFromApi } from "@/utils/api";
import { MetaData, ProductEntity } from "@/utils/type";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlices";

interface ProductProps {
  product: ProductEntity;
}
const productDetail = ({ product }: ProductProps) => {
  const productData = product.attributes;
  const dispatch = useDispatch();
  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />

      <Wrapper>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-16">
          <div className="flex-shrink-0 w-full md:w-auto">
            <Image
              width={500}
              height={500}
              src={productData.image.data.attributes.url}
              alt={productData.name}
            />
          </div>
          <div className="flex-1 py-6 md:py-0">
            <div className="text-3xl md:text-5xl font-bold mb-2 leading-tight">
              {productData.name}
            </div>
            <div className="text-base md:text-lg font-medium mb-5">
              <p>{productData.subtitle}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="text-lg md:text-xl font-medium mb-2 md:mb-0">
                SEK: {productData.current_price}&#107;&#114;
                {productData.original_price && (
                  <>
                    <span className="text-gray-500 line-through mx-2">
                      {productData.original_price}&#107;&#114;
                    </span>
                    <span className="text-green-500">
                      (
                      {getDiscountedPricePercentage(
                        productData.original_price,
                        productData.current_price
                      )}
                      % off)
                    </span>
                  </>
                )}
              </div>
              <button
                className="w-full md:w-auto py-4 px-6 md:px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 hover:opacity-75"
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: parseInt(product.id),
                      name: productData.name,
                      subtitle: productData.subtitle,
                      oneQuantityPrice: productData.current_price,
                      quantity: 1,
                      image: productData.image.data.attributes.url,
                      attributes: {
                        price: productData.current_price,
                      },
                    })
                  );
                  notify();
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export async function getStaticPaths() {
  const { data } = (await fetchDataFromApi("/api/products?populate=*")) as {
    data: ProductEntity[];
  };

  const paths = data?.map((productEntity) => ({
    params: {
      slug: productEntity.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const product = (await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${params.slug}`
  )) as { data: ProductEntity[]; meta: MetaData };
  return {
    props: {
      product: product.data[0],
    },
  };
}

export default productDetail;
