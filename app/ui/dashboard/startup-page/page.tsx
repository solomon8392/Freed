"use client"
import React from "react";
import Image from "next/image";

const startupPages = [
  {
    name: "Tulip Interfaces",
    imageSrc: "/png/cols6.png",
    tagline: "The Leader in Frontline Operations",
    altText: "Tulip Interfaces Logo",
    description: "The Leader in Frontline Operations. Tulip, the Frontline Operations Platform, is empowering the world’s leading manufacturers to improve the productivity of their teams.",
  },
  {
    name: "Wise",
    imageSrc: "/png/cols6.png",
    tagline: "The Leader in Frontline Operations",
    altText: "We're on a mission to bring transparency to finance.",
    description: "Current banking systems don’t let us send, spend or receive money across borders easily. Or quickly. Or cheaply.",
  },
];

const startupPage2 = [
    {
        imageSrc: "/png/cols6.png",
        spanText: "Allbirds",
        altText2: "Allbirds Logo",
        pText: "Real love, for your feet. All natural, <br /> made better, designed with love"
    },
    {
        imageSrc: "/png/cols6.png",
        spanText: "Yext",
        altText2: "Allbirds Logo",
        pText: "Turn your digital presence into a <br/ > differentiator"
    }
];

const uiContent = [
    {
      name: "Astranis",
      imageSrc: "/png/cols6.png",
      tagline: "Building next-generation internet satellites to get the world",
      altText: "Tulip Interfaces Logo",
      description: "Four billion people do not have access to the internet. Astranis is going to change that. We are building the next generation of smaller, lower-cost telecommunications satellite",
    },
    {
      name: "SeatGeek",
      imageSrc: "/png/cols6.png",
      tagline: "The Leader in Frontline Operations",
      altText: "If life is an event, then we have the tickets",
      description: "A live event’s better because of the people by your side. You see the same things. You feel the same feels.",
    },
  ];

export default function StartUpPage() {
  return (
    <div className="">
      {startupPages.map((startup, index) => (
        <div key={index} className="flex items-center gap-5 mb-9 shadow-2xl bg-[#FFFFFF] h-[25%] rounded-2xl">
          <Image src={startup.imageSrc} alt={startup.altText} width={112} height={128} className="w-[112px] h-[128px] rounded-md" />
          <div>
            <h1 className="text-[#333333] text-[26px] font-sans font-semibold">{startup.name}</h1>
            <span className="text-[#333333] text-[24px] font-sans">{startup.tagline}</span>
            <p className="text-[#333333] text-[16px] font-sans">{startup.description}</p>
          </div>
        </div>
      ))}
      {/* uiContent */}
     <div className="flex gap-5 justify-center">
       {startupPage2.map((col1, index) => 
     <div className="">
        <div key={index} className="flex flex-col text-center justify-center items-center w-[462px] bg-[#FFFFFF] shadow-2xl h-[320px] rounded-[16px]">
        <Image src={col1.imageSrc} alt={col1.altText2} width={112} height={128} className="rounded-2xl"/>
        <div>
            <span className="text-[26px] text-[#333333] font-bold font-sans">{col1.spanText}</span>
            <p className="text-[24px] text-[#333333] font-sans font-normal" dangerouslySetInnerHTML={{ __html: col1.pText }}></p>
        </div>
     </div>
     </div>
       )}
      </div>

      <div>
      {uiContent.map((startup, index) => (
        <div key={index} className="flex items-center gap-5 mb-9 shadow-2xl bg-[#FFFFFF] h-[25%] rounded-2xl">
          <Image src={startup.imageSrc} alt={startup.altText} width={112} height={128} className="w-[112px] h-[128px] rounded-md" />
          <div>
            <h1 className="text-[#333333] text-[26px] font-sans font-semibold">{startup.name}</h1>
            <span className="text-[#333333] text-[24px] font-sans">{startup.tagline}</span>
            <p className="text-[#333333] text-[16px] font-sans">{startup.description}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
