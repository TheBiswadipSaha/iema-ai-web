import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HomeCard({ cards = [] }) {
  const navigate = useNavigate();

  // Route mapping - all chat routes now use /chat/:type pattern
  const routeMap = {
    'Image Analyzer': '/chat/image-analyzer',
    'Image Creator': '/chat/img-playground',
    'AI Tutor': '/select-tutor', // This goes to select tutor page, not direct chat
    'Blog Generator': '/chat/blog-generator',
    'Code Generator': '/chat/code-generator',
    'Email Generator': '/chat/email-generator',
    'Web Summariser': '/chat/web-summarizer'
  };

  const handleNavigation = (linkText) => {
    const route = routeMap[linkText];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-bl">
      <div className="w-full ">
        <div className="flex gap-2 flex-wrap lg:flex-nowrap justify-center">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-[#171a1c] backdrop-blur-sm rounded-2xl p-4 border border-slate-800/50 hover:border-slate-700/50 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon with hover effect */}
                <div className="mb-5 w-fit">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 bg-[#22262A] group-hover:rotate-2 group-hover:scale-110">
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
                <p className="text-slate-500 text-[13px] leading-relaxed mb-6 text-left font-[500]">
                  {card.description}
                </p>

                {/* Button Links */}
                <div className="space-y-2 mt-auto">
                  {card.links.map((link, linkIndex) => (
                    <button
                      key={linkIndex}
                      onClick={() => handleNavigation(link.text)}
                      className="group/btn relative overflow-hidden cursor-pointer flex items-end justify-between p-2.5 rounded-2xl transition-all duration-300 bg-[#202328] w-full"
                    >
                      {/* fill animation */}
                      <span className="absolute inset-0 bg-[#02e986] w-0 group-hover/btn:w-full transition-all duration-300"></span>

                      {/* text */}
                      <span className="relative text-sm text-[#FAFAFA] group-hover/btn:text-black transition-colors duration-300 p-1 font-semibold">
                        {link.text}
                      </span>

                      {/* icon */}
                      <ArrowRight
                        className="relative w-4 h-4 text-[#FAFAFA] group-hover/btn:text-black transform group-hover/btn:translate-x-1 transition-all duration-300"
                        strokeWidth={2}
                      />
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