import React from 'react';
import { Sparkles, BookOpen, Code, Briefcase, ArrowRight } from 'lucide-react';

function HomeCard() {
  const cards = [
    {
      icon: Sparkles,
      title: 'Create Content',
      description: 'Transform your ideas into engaging blogs, stunning images, and captivating videos with the power of AI.',
      links: [
        { text: 'Video Generator', href: '#' },
        { text: 'Image Creator', href: '#' }
      ]
    },
    {
      icon: BookOpen,
      title: 'Study & Learn',
      description: 'Let AI assist you in mastering new subjects with personalized tutoring, instant summaries, and smart notes.',
      links: [
        { text: 'AI Tutor', href: '#' },
        { text: 'Blog Generator', href: '#' }
      ]
    },
    {
      icon: Code,
      title: 'Build with AI',
      description: 'Your one-stop shop for coding, debugging, and development. Generate production-ready code effortlessly.',
      links: [
        { text: 'Code Generator', href: '#' },
        { text: 'App Builder', href: '#' }
      ]
    },
    {
      icon: Briefcase,
      title: 'Business & Productivity',
      description: 'Harness generative AI to craft professional emails, documents, and comprehensive reports in seconds.',
      links: [
        { text: 'Email Generator', href: '#' },
        { text: 'Web Summariser', href: '#' }
      ]
    }
  ];

  return (
    <div className="pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-bl">
      <div className="w-full ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-bl w-full">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-[#171a1c] backdrop-blur-sm rounded-2xl p-4 border border-slate-800/50 hover:border-slate-700/50 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon with hover effect */}
                <div className="mb-5 w-fit">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-[#124e37] group-hover:rotate-2 group-hover:scale-110">
                    <card.icon
                      className="w-5 h-5 text-slate-500 group-hover:text-[#02e986] transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3 text-left group-hover:text-[#02e986]">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-[13px] leading-relaxed mb-6 text-left">
                  {card.description}
                </p>

                {/* Button Links */}
                <div className="space-y-2">
                  {card.links.map((link, linkIndex) => (
                    <button
                      key={linkIndex}
                      className=" group/btn flex items-center justify-between p-2.5 rounded-2xl transition-all duration-300 text-left bg-[#202328] hover:bg-[#00ff91] hover:shadow-[0_0_20px_rgba(0,255,145,0.5)]"
                    >
                      <span className="text-sm font-normal text-slate-400 group-hover/btn:text-black transition-colors duration-300 p-1 text-white">
                        {link.text}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover/btn:text-black transform group-hover/btn:translate-x-1 transition-all duration-300 text-white" strokeWidth={2} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeCard;