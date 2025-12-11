import React from "react";
import SearchComponent from "../components/SearchComponent";

export default function HomePage() {
    return (
        <div className="relative flex h-screen w-full items-center justify-center">
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

            <div className="z-10 flex flex-col items-center justify-center text-center text-white px-4 w-full">
                <div className="mb-8 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-2 w-[250px] justify-center mx-auto">
                    <div className="h-3 w-3 rounded-full bg-[#b3a528]"></div>
                    <span className="text-sm text-[#74818d] font-semibold text-[15px]">AI-Powered Platform</span>
                </div>
                {/* Heading */}
                <div>
                    <h1 className="mb-4 text-center text-5xl text-white">
                        <span className="font-bold">Welcome to</span> <span className="italic text-emerald-400">GenAI Studio</span>
                    </h1>
                    <div className="w-[500px] text-center text-[#7c7c7c] text-[15px] font-[500]">
                        A comprehensive AI platform designed to enhance creativity, learning,
                        development, and productivity.
                    </div>
                </div>
                <div className="mt-20 w-[50%]">
                    <SearchComponent />
                </div>

            </div>

        </div>
    );
}