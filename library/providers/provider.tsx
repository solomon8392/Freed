"use client";

import React from "react";

import { AppWrapper } from "../context/state";

function Providers({ children }: { children: React.ReactNode }) {
    return <AppWrapper>{children}</AppWrapper>;
}

export default Providers;
