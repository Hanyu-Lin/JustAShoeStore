import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import { BsCart } from "react-icons/bs";
import useSWR from "swr";
import { Category } from "@/utils/type";
import { capital } from "@/utils/helpers";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const fetcher = async (url: string): Promise<Category[]> => {
  const response = await fetch(url);
  const { data } = await response.json();
  return data;
};

const Header = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { data: categories, error } = useSWR<Category[]>(
    "http://127.0.0.1:1337/api/categories?populate=*",
    fetcher
  );

  if (error) return <div>Error loading categories</div>;
  if (!categories) return <div>Loading...</div>;
  const categoryNames = categories.map((category) => category.slug);
  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 }`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <h1 className="text-4xl font-bold hover:text-gray-400 ">
            Shoe-Store
          </h1>
        </Link>

        <div className="flex gap-5">
          {categoryNames?.map((name) => (
            <Link href={`/category/${name}`} key={name}>
              <p className="text-[12px] md:text-[16px] text-black hover:text-[#ff0000]">
                {capital(name)}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 text-black">
          <Link href="/cart">
            <div className="navIconDiv">
              <BsCart className="text-[15px] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div className="navIconCornerText">{cartItems.length}</div>
              )}
            </div>
          </Link>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
