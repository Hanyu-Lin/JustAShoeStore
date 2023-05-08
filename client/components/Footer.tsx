"use client";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-14 pb-3 flex-shrink-0">
      <div className="container mx-auto px-4 md:flex md:items-center md:justify-between">
        {/* LEFT START */}
        <h3 className="text-white text-2xl text-center">Shoe Store</h3>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex justify-center md:justify-end md:flex-1 flex-wrap">
          <Link
            href="https://facebook.com"
            className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer mr-2 md:mr-5"
          >
            <FaFacebookF size={20} />
          </Link>
          <Link
            href="https://twitter.com"
            className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer mr-2 md:mr-5"
          >
            <FaTwitter size={20} />
          </Link>
          <Link
            href="https://youtube.com"
            className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer mr-2 md:mr-5"
          >
            <FaYoutube size={20} />
          </Link>
          <Link
            href="https://instagram.com"
            className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer mr-2 md:mr-5"
          >
            <FaInstagram size={20} />
          </Link>
        </div>
        {/* RIGHT END */}
      </div>
      <div className="container mx-auto px-4">
        <div className="flex justify-center md:justify-between mt-5">
          <div className="flex gap-2 text-center md:text-left flex-wrap justify-center">
            <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
              Guides
            </div>
            <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
              Terms of Sale
            </div>
            <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
              Terms of Use
            </div>
            <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
              Privacy Policy
            </div>
          </div>
          <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer text-center md:text-right mt-5 md:mt-0">
            © 2023 Shoe store , Inc. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
