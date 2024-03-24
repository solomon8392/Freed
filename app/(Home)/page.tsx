/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Image from "next/image";

const page = () => {
  return (
    <section className="w-full my-32">
      <div className="flex justify-between items-center px-20">
        <div>
          <Image src="/png/LOGO (2).png" alt={"img"} width={"50"} height={"50"} className="" />
        </div>
        <div>
          <ul className="flex font-sans font-light gap-10">
            <li><a href="">About</a></li>
            <li><a href="">Features</a></li>
            <li><a href="">How it works</a></li>
            <li><a href="">Faq</a></li>
            <li><a href="">Contact</a></li>

          </ul>
        </div>
        <div className="flex gap-4">
          <Image src="/png/Vector.png" alt={"img"} width={"30"} height={"30"} className="" />
          <Image src="/png/Vector (1).png" alt={"img"} width={"30"} height={"30"} className="" />
          <Image src="/png/Vector.png" alt={"img"} width={"30"} height={"30"} className="" />
          <Image src="/png/Group (2).png" alt={"img"} width={"30"} height={"30"} className="" />

        </div>

      </div>

      <div className="border border-black flex w-11/12 mx-14"></div>

      <div className="flex  gap-8  justify-center py-24- top-10 relative">
        <p className="text-center">© 2023 Freed. All rights reserved.</p>

        <div className="flex gap-4">
          <a href="">Privacy Policy</a>
          <a href="">Terms of Use</a>
          <a href="">Cookie Policy</a>
        </div>
      </div>
    </section>
  );
};

export default page;
