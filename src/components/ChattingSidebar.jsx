import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Send, Image, Paperclip, Sparkles, FileText, Globe, Mail, Code, MessageSquare, Crown, Settings, History, CardSim, CreditCard, WandSparkles } from 'lucide-react';

export const ChattingSidebar = ({ pageConfig, onFilterChange }) => {
  const [filters, setFilters] = useState({});

  const handleFilterClick = (heading, label) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [heading]: prev[heading] === label ? null : label
      };
      
      // Notify parent about filter changes
      if (onFilterChange) {
        onFilterChange(newFilters);
      }
      
      return newFilters;
    });
  };

  if (!pageConfig?.filters) return null;

  return (
    <div className="w-72 bg-black border-r border-gray-800 h-screen overflow-y-auto p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center border border-[#3b3b3fcc] bg-[#111114] mb-6 rounded-lg px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="p-3 border border-[#035c37d7] bg-[#035c3773] rounded-xl flex items-center justify-center">
            <span className='text-[#00FF95] text-[2rem]'>{pageConfig.icon}</span>
          </div>
          <div>
            <h2 className="text-white font-semibold">{pageConfig.title}</h2>
            <p className="text-gray-400 text-xs">{pageConfig.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center bg-[#131418] rounded-md px-1 py-1 w-full gap-2 mb-5">
        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#09090B] text-white font-medium transition text-base">
          <span className='text-xl'><WandSparkles /></span>
          <span>Generate</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-300 hover:bg-[#2A2A2A] transition">
          <span><History /></span>
          <span>History</span>
        </button>
      </div>

      {/* Filter Sections */}
      {pageConfig.filters.map((filterSection, idx) => (
        <div key={idx} className="mb-4">
          <div className="rounded-2xl p-3 border border-[#363638] bg-[#111114]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#00FF95]">{filterSection.icon}</span>
              <span className="text-white text-sm">{filterSection.heading}</span>
            </div>
            <div className="flex flex-wrap gap-2 w-auto">
              {filterSection.options.map((option, optIdx) => {
                const isActive = filters?.[filterSection.heading] === option.label;
                return (
                  <div
                    key={optIdx}
                    onClick={() => handleFilterClick(filterSection.heading, option.label)}
                    className={`
                      px-3 py-2 rounded-full cursor-pointer transition text-sm
                      flex gap-2 items-center border
                      ${
                        isActive
                          ? "border-2 border-[#035c37d7] bg-[#035c3773] text-[#00FF95] font-semibold"
                          : "bg-[#1A1A1A] border-[#3b3b3fcc] text-[#878792] hover:bg-[#1c1c20b2] hover:border-[#00FF95]"
                      }
                    `}
                  >
                    <span>{option.icon}</span>
                    {option.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      {/* Credits */}
      <div className="mt-auto pt-6 flex-end">
        <div className="rounded-lg p-3 border border-[#3b3b3fcc] bg-[#111114]">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard size={16} className='text-[#00FF95]'/>
            <span className="text-white text-sm">Credits</span>
          </div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-[#00FF95] text-2xl font-bold mb-1">2,450</span>
            <span className="text-[#878792] text-xs">remaining</span>
          </div>
          <div className="text-[#878792] text-xs">~245 messages left this month</div>
          <button className="w-full mt-3 bg-[#39E48F] hover:bg-[#4ad690] text-black rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
            <Crown size={16} />
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
};
