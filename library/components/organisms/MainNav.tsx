"use client";
import Image from "next/image";

import React from "react";

export default function MainNav() {
    return (
        <main className="w-full font-sans">
            <nav className=" w-screen shadow-lg">
                <div className=" flex justify-between items-center font-sans px-16 my-2 ">
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
                    <div>
                        <button className=" bg-purple-900 py-1 px-6 text-white rounded-lg">Sign Up</button>
                    </div>
                </div>
            </nav>

            <div className=" my-10">
                <div className="flex flex-row text-center justify-between ">
                    <div className="flex flex-col gap-10- text-center">
                        <div className=" mx-32 relative ">
                            <Image src="/png/Group 11.png" alt={"img"} width={"100"} height={"100"} className="" />
                            <div className=" px-20">
                                <h1 className=" text-6xl font-bold w-11/12 text-center">Welcome To <a className=" text-purple-900" href="#">Freed</a>, the  Future Of Freelancing</h1>
                            </div>
                            <div className="flex mx-44- left-44- relative my-4">
                                <p className=" text-xl w-4/6 mx-44 " >Join our decentralized platform and experience the benefits of blockchain technology in the freelance industry.</p>

                            </div>
                            <Image src="/png/Group 10.png" alt={"img"} width={"100"} height={"100"} className=" left-[860px] bottom-20 relative" />

                        </div>
                        <div className="flex gap-6 left-[500px] relative">
                            <button className="bg-purple-900 py-1 px-4 text-white rounded-lg">Get Started</button>
                            <button className="border border-purple-900  py-1 px-4 text-black rounded-lg"> Learn More</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-around ">
                <Image src="/png/col2.png" alt={"img"} width={"1100"} height={"500"} className=" " />
            </div>

            <div className="flex justify-center items-center py-16">
                <div className="flex flex-col gap-4 px-20">
                    <h1>About</h1>
                    <h2 className=" text-4xl w-4/6 font-bold">Experience a Decentralized Marketplace for Transparent <a className=" text-purple-900" href="">and Fair Freelancing</a> </h2>
                    <p className=" text-sm w-9/12">Freed's decentralized marketplace ensures transparency and fairness by eliminating intermediaries and providing a secure environment for freelancers and clients to collaborate.</p>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                            <Image src="/png/trade.png" alt={"img"} width={"20"} height={"20"} className="" />
                            <p>Transparent Transactions</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src="/png/trade.png" alt={"img"} width={"20"} height={"20"} className="" />
                            <p>Fair and Equitable Environment</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src="/png/trade.png" alt={"img"} width={"20"} height={"20"} className="" />
                            <p>Elemination of third parties</p>
                        </div>
                    </div>
                </div>
                <div className=" top-10 right-40 relative ">
                    <Image src="/png/iPad Pro.png" alt={"img"} width={"500"} height={"500"} className="" />
                </div>
            </div>


            <div className="flex justify-around- gap-20  items-center- px-16 py-20">
                <div>
                    <p>Features</p>
                    <Image src="/png/col112.png" alt={"img"} width={"800"} height={"500"} className="py-12" />
                </div>

                <div className="flex flex-col gap-4">
                    <p className=" font-bold text-4xl w-10/12">Unlock Global Opportunities with Cryptocurrency Payments on Freed</p>
                    <p className=" w-7/12 text-sm">Freed empowers freelancers worldwide by enabling cryptocurrency payments, providing access to the freelance economy without banking limitations.</p>

                    <div className="flex flex-col gap-2 ">
                        <div className="flex items-center gap-4">
                            <Image src="/png/trade.png" alt={"img"} width={"20"} height={"20"} className="" />
                            <p className=" text-sm">Transparent Transactions</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src="/png/trade.png" alt={"img"} width={"20"} height={"20"} className="" />
                            <p className=" text-sm">Fair and Equitable Environment</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src="/png/trade.png" alt={"img"} width={"20"} height={"20"} className="" />
                            <p className=" text-sm">Elemination of third parties</p>
                        </div>
                        <div className="flex gap-6 my-4">
                            <button className="bg-purple-900 py-1 px-4 text-white rounded-lg">Sign Up</button>
                            <button className="text-purple-900  py-1 px-4 rounded-lg"> Learn More</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex flex-row justify-center px-20">
                <div className=" left-10- relative">
                    <h1 className=" font-bold text-4xl w-5/6">Intuitive Dashboards for Freelancers and Clients</h1>
                    <div className="flex gap-6 my-24">
                        <button className="bg-purple-900 py-1 px-4 text-white rounded-lg">Sign Up</button>
                        <button className="text-purple-900  py-1 px-4 rounded-lg flex  gap-4 items-center"> Learn More <Image src="/png/arrow-side.png" alt={"img"} width={"20"} height={"20"} className="" /> </button>
                    </div>
                </div>
                <div className="flex flex-col gap-6 w-4/6">
                    <p className="">Freed provides comprehensive user dashboards that offer insights into job statuses, financials, communications, and more. These intuitive dashboards enhance user experience and productivity.</p>
                    <div className="flex gap-4">
                        <div>
                            <h3 className=" font-bold">Overview</h3>
                            <p>Get a clear overview of your ongoing projects, earnings, and communication history.</p>
                        </div>
                        <div>
                            <h3 className=" font-bold">Financials</h3>
                            <p>Track your earnings, invoices, and payments in one centralized location.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-around ">
                <Image src="/png/col2.png" alt={"img"} width={"1100"} height={"1000"} className=" " />
            </div>

            <div>
                <div className="flex justify-center items-center- py-36">
                    <div className=" top-10- left-14 relative  mx-20-">
                        <Image src="/png/iMac Mockup (24 inch).png" alt={"img"} width={"1000"} height={"1000"} className="" />
                    </div>
                    <div className="flex flex-col gap-4 px-20">
                        <h2 className=" text-4xl w-5/6 font-bold">Expand Your Skills with Freed's Learning Opportunities</h2>
                        <p className=" text-sm w-5/6">At Freed, we believe in continuous growth and learning. That's why we offer a range of resources and workshops to help you enhance your skills and stay ahead in your freelance career.</p>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-4">
                                <Image src="/png/trade.png" alt={"img"} width={"20"} height={"20"} className="" />
                                <p>Access to Expert-led Workshops</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Image src="/png/trade.png" alt={"img"} width={"20"} height={"20"} className="" />
                                <p>Interactive Learning Resources</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Image src="/png/trade.png" alt={"img"} width={"20"} height={"20"} className="" />
                                <p>Community Forums for Knowledge Sharing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center ">
                <div className="border border-purple-900 p-10">
                    <h2 className=" font-bold text-2xl w-80">Join the Freed Community Today</h2>
                    <p>Discover a new way to freelance and connect with clients globally.</p>
                    <div className="flex gap-6 my-6">
                        <button className="bg-purple-900 py-1 px-9 text-white rounded-lg">Sign Up</button>
                        <button className="text-purple-900  border border-purple-900 py-2 px-2 rounded-lg flex  gap-2 items-center"> Learn More <Image src="/png/arrow-side.png" alt={"img"} width={"20"} height={"20"} className="" /> </button>
                    </div>
                </div>
                <div className=" bg-purple-500 h-72 w-96 flex items-center ">
                    <div className=" text-center px-28 py-8">
                        <Image src="/png/LOGO (2).png" alt={"img"} width={"200"} height={"200"} className="" />
                    </div>
                </div>
            </div>

            <div className=" bg-purple-800 text-white my-20">
                <div className="flex flex-col justify-center text-center gap-4 p-16">
                    <h1 className=" text-3xl font-bold w-4/12-">Stay Informed with <br /> Our Newsletter</h1>
                    <p>Subscribe to receive updates, industry insights, and valuable tips.</p>
                    <div className="flex gap-6 px-[500px]">
                        <input className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                        <button className="bg-purple-500 px-6 rounded-lg">Subscribe</button>
                    </div>

                    By continuing, you agree to our terms and condition
                </div>
            </div>

            <div className="flex justify-center items-center text-center gap-10 w-8/12- mx-56-">
                <div className=" flex items-center flex-col gap- text-center ">
                    <Image src="/png/sms (1).png" alt={"img"} width={"40"} height={"40"} className="" />
                    <p className=" font-medium w-72">Feel free to reach out to us with any questions or inquiries.</p>
                    <p className="font-semibold">hello@cartesifreed.io</p>
                </div>
                <div className=" flex items-center flex-col gap-3 text-center ">
                    <Image src="/png/location.png" alt={"img"} width={"40"} height={"40"} className="" />

                    <p className=" font-medium w-60">We're available to assist you during business hours.</p>
                    <p className=" font-semibold">+1 (555) 123-4567</p>
                </div>
                <div className=" flex items-center flex-col gap-3 text-center ">
                    <Image src="/png/call-calling.png" alt={"img"} width={"40"} height={"40"} className="" />

                    <p className=" font-medium w-80">Visit our office for a personal consultation or meeting.</p>
                    <p className=" font-semibold">123 Main St, Anytown, USA</p>

                </div>

            </div>

        </main >
    )
}