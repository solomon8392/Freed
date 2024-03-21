"use client"
import React from "react";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Rate images",
        path: "/dashboard",
      },
      {
        title: "Dashboard",
        path: "/ui/dashboard/sidebar",
      },
      {
        title: "Job Hunt",
        path: "/ui/dashboard/jobhunt",
      },
      {
        title: "Start Ups",
        path: "/ui/dashboard/startup-page",
      },
      {
        title: "Community",
        path: "/dashboard/revenue",
      },
      {
        title: "My Projects",
        path: "/ui/dashboard/my_project",
      },
      {
        title: "Contests",
        path: "/ui/dashboard/contest-page",
      },
      {
        title: "Wallet",
        path: "/ui/dashboard/wallet",
      },
    ],
  },
];

export default function sideNav() {
  return (
    <div className="">
      <ul className="">
        {menuItems.map((cat) => (
          <li key={cat.title} className="">
            <span className="">{cat.title}</span>
            <ul className="grid gap-2">
              {cat.list.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center px-4 bg-[#FFFFFF] hover:bg-[#6A0572] hover:text-[#FFFFFF] shadow-lg w-[17%] h-[9vh] text-center gap-2 text-[#333333] font-sans"
                >
                  <a href={item.path}>{item.title}</a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
