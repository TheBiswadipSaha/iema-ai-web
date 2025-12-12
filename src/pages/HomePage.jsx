import React from "react";
import SearchComponent from "../components/SearchComponent";
import HomeCard from "../components/HomeCard";

export default function HomePage() {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center py-8 px-4">
            <div className="absolute h-200 w-200 bg-[#05a014a4] blur-[500px] -z-10">

            </div>
            {/* Grid pattern */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundSize: "40px 40px",

                }}
            />

            {/* Dark mode grid pattern */}
            <div
                className="absolute inset-0 hidden dark:block"
                style={{
                    backgroundSize: "60px 60px",
                    backgroundImage: `
            linear-gradient(to right, rgba(0, 70, 51,1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 70, 51,1) 1px, transparent 1px)
          `
                }}
            />

            {/* Radial gradient fade */}
            <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#000000]"
                style={{
                    maskImage: "radial-gradient(ellipse at center, transparent 10%, #00af12fb 70%)"
                }}
            />

            {/* Content */}

            <div className="z-10 flex flex-col items-center justify-center text-center text-white w-full max-w-6xl">
                <div className="mb-6 sm:mb-8 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-2 w-full max-w-[250px] justify-center mx-auto">
                    <div className="h-3 w-3 rounded-full bg-[#b3a528]"></div>
                    <span className="text-sm text-[#74818d] font-semibold text-[15px]">AI-Powered Platform</span>
                </div>
                {/* Heading */}
                <div className="w-full px-4">
                    <h1 className="mb-4 text-center text-3xl sm:text-4xl md:text-5xl text-white">
                        <span className="font-bold">Welcome to</span> <span className="italic text-emerald-400">GenAI Studio</span>
                    </h1>
                    <div className="w-full max-w-[500px] mx-auto text-center text-[#7c7c7c] text-[14px] sm:text-[15px] font-[500]">
                        A comprehensive AI platform designed to enhance creativity, learning,
                        development, and productivity.
                    </div>
                </div>
                <div className="mt-12 sm:mt-16 md:mt-20 w-full max-w-[90%] md:max-w-[80%] lg:max-w-[100%]">
                    <HomeCard/>
                    <SearchComponent />
                </div>

            </div>

        </div>
    );
}