import React from "react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="overflow-hidden">
      <div>
        <Image src="/png/cols1.png" alt={"col1"} width={"630"} height={"760"} />
        <Image src="/png/cols2.png" alt={"col1"} width={"630"} height={"760"} />
      </div>
    </div>
  );
}
