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
    <div className="pb-20   flex items-center justify-center">
      <div className="max-w-10xl ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-800/50 hover:border-slate-700/50 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon with hover effect */}
                <div className="mb-5 w-fit">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-slate-800/80 group-hover:rotate-6 group-hover:scale-110">
                    <card.icon className="w-6 h-6 text-slate-500 group-hover:text-slate-400 transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-[13px] leading-relaxed mb-6">
                  {card.description}
                </p>

                {/* Button Links */}
                <div className="space-y-2">
                  {card.links.map((link, linkIndex) => (
                    <button
                      key={linkIndex}
                      className="w-full group/btn flex items-center justify-between px-0 py-2 rounded-lg transition-all duration-300 text-left"
                    >
                      <span className="text-sm font-normal text-slate-400 group-hover/btn:text-white transition-colors duration-300">
                        {link.text}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover/btn:text-slate-400 transform group-hover/btn:translate-x-1 transition-all duration-300" strokeWidth={2} />
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