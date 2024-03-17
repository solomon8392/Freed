/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Image from "next/image";

const page = () => {
  return (
    <div className="overflow-y-hidden">
      <div>
        <h1 className="text-[#333333] text-[48px] font-bold flex justify-center">
          Freed
        </h1>
        <p className="text-center py-6 text-[24px] items-center">
          Welcome to{" "}
          <span className="text-[#6A0572] text-[24px] font-semibold">
            FREED
          </span>
          , the pioneering space where talent <br />
          meets opportunity in the decentralized world.{" "}
        </p>
      </div>
      <div className="flex justify-center">
        <Image
          src="/png/icon2.png"
          alt={"icon2"}
          width={"633"}
          height={"413"}
        />
      </div>
    </div>
  );
};

export default page;
