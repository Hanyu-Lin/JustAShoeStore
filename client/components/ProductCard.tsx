import { getDiscountedPricePercentage } from "@/utils/helpers";
import { Product } from "@/utils/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  productData: Product;
}
const ProductCard = ({ productData }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${productData.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer h-full flex flex-col"
    >
      <div className="relative flex-shrink-0 w-full h-72 ">
        <Image
          fill
          sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          src={productData.image.data.attributes.url}
          alt={productData.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4 text-black/[0.9] flex-grow">
        <h2 className="text-lg font-medium">{productData.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">
            {productData.current_price} &#107;&#114;
          </p>
          {productData.original_price && (
            <>
              <p className="text-base  font-medium line-through">
                {productData.original_price}&#107;&#114;
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(
                  productData.original_price,
                  productData.current_price
                )}
                % off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
