import React from "react";
import Image from "next/image";

export default function Dashboardpage() {
  return (
    <div>
      <div>
        <ul className="grid gap-[8px]">
          <li className="flex items-center px-4 bg-[#FFFFFF] hover:bg-[#8E44AD] hover:text-[#FFFFFF] shadow-lg w-[20%] h-[9vh] text-center gap-2 text-[#333333] font-sans">
            <Image src="/png/like.png" alt="" width={"20"} height={"20"} />
            <a href="" className="text-[20px]">
              Rate images
            </a>
          </li>
          <li className="flex items-center px-4 bg-[#FFFFFF] hover:bg-[#8E44AD] hover:text-[#FFFFFF] shadow-lg w-[20%] h-[9vh] text-center gap-2 text-[#333333] font-sans">
            <Image src="/png/like.png" alt="" width={"20"} height={"20"} />
            <a href="./Login" className="text-[20px]">
              Dashboard
            </a>
          </li>
          <li className="flex items-center px-4 bg-[#FFFFFF] hover:bg-[#8E44AD] hover:text-[#FFFFFF] shadow-lg w-[20%] h-[9vh] text-center gap-2 text-[#333333] font-sans">
            <Image src="/png/like.png" alt="" width={"20"} height={"20"} />
            <a href="" className="text-[20px]">
              Job Hunt
            </a>
          </li>
          <li className="flex items-center px-4 bg-[#FFFFFF] hover:bg-[#8E44AD] hover:text-[#FFFFFF] shadow-lg w-[20%] h-[9vh] text-center gap-2 text-[#333333] font-sans">
            <Image src="/png/like.png" alt="" width={"20"} height={"20"} />
            <a href="" className="text-[20px]">
              Start Ups
            </a>
          </li>
          <li className="flex items-center px-4 bg-[#FFFFFF] hover:bg-[#8E44AD] hover:text-[#FFFFFF] shadow-lg w-[20%] h-[9vh] text-center gap-2 text-[#333333] font-sans">
            <Image src="/png/like.png" alt="" width={"20"} height={"20"} />
            <a href="" className="text-[20px]">
              Community
            </a>
          </li>
          <li className="flex items-center px-4 bg-[#FFFFFF] hover:bg-[#8E44AD] hover:text-[#FFFFFF] shadow-lg w-[20%] h-[9vh] text-center gap-2 text-[#333333] font-sans">
            <Image src="/png/like.png" alt="" width={"20"} height={"20"} />
            <a href="" className="text-[20px]">
              My Projects
            </a>
          </li>
          <li className="flex items-center px-4 bg-[#FFFFFF] hover:bg-[#8E44AD] hover:text-[#FFFFFF] shadow-lg w-[20%] h-[9vh] text-center gap-2 text-[#333333] font-sans">
            <Image src="/png/like.png" alt="" width={"20"} height={"20"} />
            <a href="" className="text-[20px]">
              Contests
            </a>
          </li>
          <li className="flex items-center px-4 bg-[#FFFFFF] hover:bg-[#8E44AD] hover:text-[#FFFFFF] shadow-lg w-[20%] h-[9vh] text-center gap-2 text-[#333333] font-sans">
            <Image src="/png/like.png" alt="" width={"20"} height={"20"} />
            <a href="" className="text-[20px]">
              Wallet
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
