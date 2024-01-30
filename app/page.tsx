"use client";
import collider from "@/Library/collider";
import AllBounties from "@/Library/components/organisms/AllBounties";
import { useEffect, useRef } from "react";

const page = () => {
  const canvasParentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    collider({ canvasParentRef });
  }, []);

  return (
    <div className="w-full">
      <div
        className="w-full min-h-[5rem] flex flex-1 items-center justify-center"
        ref={canvasParentRef}
      ></div>
      <AllBounties />
    </div>
  );
};

export default page;
