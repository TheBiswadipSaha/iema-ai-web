import React, { useState, useEffect, useRef } from 'react';
import { Image, Crown, History, WandSparkles, ChevronDown, X, Sliders, CreditCard } from 'lucide-react';
import { useHttp } from '../hooks/useHttp';
import { useAuth } from '../context/AuthContext';
import LanguageSelector from './LanguageSelector';
import BuyCreditsModal from '../utils/BuyCreditsModal';

export const ChattingSidebar = ({ pageConfig, onFilterChange }) => {
  const [width, setWidth] = useState(320); // Default width in pixels
  const [isResizing, setIsResizing] = useState(false);
  const [filters, setFilters] = useState({});
  const [expanded, setExpanded] = useState({});
  const [sliders, setSliders] = useState({});
  const [activeTab, setActiveTab] = useState('generate');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const { getReq } = useHttp();
  const {token} = useAuth();
  const score = localStorage.getItem('unknown') || sessionStorage.getItem('unknown') || 0;
  // const userData = JSON.parse(sessionStorage.getItem('user'));

  const minWidth = 280;
  const maxWidth = 600;

  // Handle resize drag
  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleFilter = (heading, label) => {
    const newFilters = { ...filters, [heading]: filters[heading] === label ? null : label };
    updateFilters(newFilters);
  };

  const handleSlider = (heading, value) => {
    setSliders(prev => ({ ...prev, [heading]: value }));
    updateFilters({ ...filters, [heading]: value });
  };

  const clearAll = () => {
    setFilters({});
    setSliders({});
    onFilterChange?.({});
  };

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const response = await getReq('api/conversations/get-all-conversations', token);
      if (response?.data) {
        setConversations(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  // const loadRazorpay = () => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //     script.onload = () => resolve(true);
  //     script.onerror = () => resolve(false);
  //     document.body.appendChild(script);
  //   });
  // };

  // const handlePay = async () => {
  //   const loaded = await loadRazorpay();
  //   if(!loaded){
  //     alert("Razorpay SDK failed to load. Are you online?");
  //     return;
  //   }
  //   const options = {
  //     key: "scsc",
  //     amount: 50*100,
  //     currency: "INR",
  //     name: "IEMA AI",
  //     description: "Test Transaction",
  //     handler: function (response) {
  //       console.log({response});
  //     },
  //     theme: {
  //       color: "#10B981",
  //     },
  //     prefill: {
  //       name: userData?.name,
  //       email: userData?.email
  //     },
  //     modal: {
  //       backdropclose: false,
  //       escape: false,
  //     }
  //   };
  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'history' && conversations.length === 0) {
      fetchConversations();
    }
  };

  const activeCount = Object.values(filters).filter(Boolean).length;
  
  if (!pageConfig?.filters) return null;

  return (
    <div 
      className="relative bg-[#0A0A0B] border-r border-gray-800/50 h-screen overflow-hidden flex flex-col"
      style={{ width: `${width}px`, minWidth: `${minWidth}px`, maxWidth: `${maxWidth}px` }}
    >
      {/* Resize Handle */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-1 hover:w-1.5 cursor-col-resize z-50 transition-all ${
          isResizing ? 'bg-emerald-500 w-1.5' : 'bg-transparent hover:bg-emerald-500/50'
        }`}
        onMouseDown={handleMouseDown}
        style={{ 
          cursor: 'col-resize',
          touchAction: 'none'
        }}
      />

      {/* Sidebar Content with proper overflow handling */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header - Fixed */}
        <div className="p-6 border-b border-gray-800/50 flex-shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl border border-emerald-500/30 flex-shrink-0">
              <span className='text-emerald-400 text-2xl'>{pageConfig?.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-semibold text-lg truncate">{pageConfig?.title}</h2>
              <p className="text-gray-500 text-sm truncate">{pageConfig?.subtitle}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#131316] rounded-lg p-1 gap-1">
            <button 
              onClick={() => handleTabChange('generate')}
              className={`flex-1 flex cursor-pointer items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all ${
                activeTab === 'generate'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <WandSparkles size={18} />
              Generate
            </button>
            <button 
              onClick={() => handleTabChange('history')}
              className={`flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <History size={18} />
              History
            </button>
          </div>
        </div>

        {/* Filters Header - Fixed */}
        {activeTab === 'generate' && (
          <div className="px-6 py-4 border-b border-gray-800/50 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <Sliders size={18} className="text-[#39E48F] flex-shrink-0" />
              <h3 className="text-white font-semibold truncate">Filters</h3>
              {activeCount > 0 && (
                <span className="px-2 py-0.5 bg-emerald-500/20 text-[#39E48F] text-xs rounded-full border border-emerald-500/30 flex-shrink-0">
                  {activeCount}
                </span>
              )}
            </div>
            {activeCount > 0 && (
              <button onClick={clearAll} className="text-gray-400 cursor-pointer hover:text-white text-xs flex items-center gap-1 flex-shrink-0">
                <X size={14} />
                Clear
              </button>
            )}
          </div>
        )}

        {/* Scrollable Filter Sections */}
        {activeTab === 'generate' && (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {pageConfig.filters.map((section, idx) => {
              const isExpanded = expanded[section.heading] !== false;
              
              return (
                <div key={idx} className="rounded-xl border border-gray-800/50 bg-[#0F0F11] overflow-hidden hover:border-gray-700/50">
                  {/* Section Header */}
                  <button
                    onClick={() => setExpanded(prev => ({ ...prev, [section.heading]: !isExpanded }))}
                    className="w-full flex cursor-pointer items-center justify-between p-4 hover:bg-gray-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 pointer-events-none min-w-0">
                      <span className="text-emerald-400 flex-shrink-0">{section.icon}</span>
                      <span className="text-white text-sm font-medium truncate">{section.heading}</span>
                    </div>
                    <ChevronDown size={18} className={`text-gray-400 transition-transform pointer-events-none flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Section Content */}
                  {isExpanded && (
                    <div className="p-4 pt-0 mt-4">
                      {/* Options */}
                      {section.options && !section.inputType && (
                        <div className="flex flex-wrap gap-2">
                          {section.options.map((opt, i) => {
                            const active = filters[section.heading] === opt.label;
                            return (
                              <button
                                key={i}
                                onClick={() => handleFilter(section.heading, opt.label)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer flex items-center gap-2 border transition-all ${
                                  active
                                    ? "border-emerald-500/50 bg-emerald-500/10 text-[#39E48F]"
                                    : "bg-[#131316] border-gray-700/50 text-gray-400 hover:bg-gray-800/50 hover:border-emerald-500/30"
                                }`}
                              >
                                <span className={active ? 'text-[#39E48F]' : 'text-gray-500'}>{opt.icon}</span>
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Slider */}
                      {section.inputType === 'slider' && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-xs">Level</span>
                            <span className="text-emerald-400 text-sm font-semibold">
                              {sliders[section.heading] || section.default || 50}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={section.min || 0}
                            max={section.max || 100}
                            value={sliders[section.heading] || section.default || 50}
                            onChange={(e) => handleSlider(section.heading, e.target.value)}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer slider-thumb"
                            style={{
                              background: `linear-gradient(to right, #10b981 0%, #10b981 ${sliders[section.heading] || section.default || 50}%, #1f1f23 ${sliders[section.heading] || section.default || 50}%, #1f1f23 100%)`
                            }}
                          />
                        </div>
                      )}

                      {/* Language Selector */}
                      {section.inputType === 'languageSelector' && (
                        <LanguageSelector 
                          defaultLanguage={filters[section.heading] || section.default}
                          onLanguageChange={(language) => {
                            updateFilters({
                              ...filters,
                              [section.heading]: language
                            });
                          }}
                        />
                      )}

                      {/* Text/Number */}
                      {(section.inputType === 'text' || section.inputType === 'number') && (
                        <input
                          type={section.inputType}
                          placeholder={section.placeholder}
                          className="w-full mt-3 px-3 py-2.5 bg-[#131316] border border-gray-700/50 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                        />
                      )}

                      {/* Dropdown */}
                      {section.inputType === 'dropdown' && (
                        <select className="w-full mt-3 px-3 py-2.5 bg-[#131316] border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20">
                          {section.options.map((opt, i) => (
                            <option key={i} value={opt.label}>{opt.label}</option>
                          ))}
                        </select>
                      )}

                      {/* Additional Fields */}
                      {section.fields && (
                        <div className="mt-3 space-y-2">
                          {section.fields.map((field, i) => (
                            <input
                              key={i}
                              type="text"
                              placeholder={field.placeholder}
                              className="w-full px-3 py-2.5 bg-[#131316] border border-gray-700/50 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                            />
                          ))}
                        </div>
                      )}

                      {/* File Upload */}
                      {section.inputType === 'file' && (
                        <div className="mt-3 border-2 border-dashed border-gray-700/50 rounded-lg p-6 text-center hover:border-emerald-500/50 transition-all cursor-pointer bg-[#131316]">
                          <Image size={32} className="mx-auto text-gray-600 mb-2" />
                          <p className="text-emerald-400 text-sm font-medium mb-1">
                            {section.placeholder || 'Click to upload'}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {section.acceptedFormats?.join(', ')} (max {section.maxSize})
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* History Section - Scrollable */}
        {activeTab === 'history' && (
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#39E48F] mx-auto mb-3"></div>
                  <p className="text-gray-400 text-sm">Loading conversations...</p>
                </div>
              </div>
            ) : conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="p-4 bg-gray-800/30 rounded-full mb-4">
                  <History size={32} className="text-gray-600" />
                </div>
                <h3 className="text-white font-medium mb-2">No conversations yet</h3>
                <p className="text-gray-500 text-sm">
                  Your conversation history will appear here once you start generating content.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {conversations.map((conversation, idx) => (
                  <div
                    key={conversation.id || idx}
                    className="rounded-xl border border-gray-800/50 bg-[#0F0F11] p-4 hover:border-emerald-500/30 hover:bg-gray-800/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white text-sm font-medium line-clamp-1 flex-1 group-hover:text-[#39E48F] transition-colors">
                        {conversation.title || 'Untitled Conversation'}
                      </h4>
                      <span className="text-gray-500 text-xs whitespace-nowrap ml-2">
                        {conversation.createdAt ? new Date(conversation.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>
                    {conversation.preview && (
                      <p className="text-gray-400 text-xs line-clamp-2 mb-3">
                        {conversation.preview}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs">
                      {conversation.messageCount && (
                        <span className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded-md">
                          {conversation.messageCount} messages
                        </span>
                      )}
                      {conversation.type && (
                        <span className="px-2 py-1 bg-emerald-500/10 text-[#39E48F] rounded-md border border-emerald-500/20">
                          {conversation.type}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Credits Section - Fixed at bottom */}
        <div className="mt-auto p-6 border-t border-gray-800/50 flex-shrink-0">
          <div className="rounded-xl border border-gray-800/50 bg-[#0F0F11] p-4 hover:border-gray-700/50 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <CreditCard size={14} className='text-[#39E48F]'/>
              </div>
              <span className="text-white text-sm font-medium">Credits</span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[#39E48F] text-3xl font-bold">{score}</span>
              <span className="text-gray-500 text-sm">remaining</span>
            </div>
            <div className="flex items-center gap-1 mb-4">
              <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#39E48F] w-[65%] rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-3">~245 messages left this month</p>
            <button className="w-full bg-[#39E48F] hover:from-emerald-600 hover:to-emerald-700 text-black rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-2" onClick={() => setShowBuyModal(true)}>
              <Crown size={16} />
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
      {showBuyModal && <BuyCreditsModal open={showBuyModal} onClose={() => setShowBuyModal(false)} />}

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #39E48F;
          cursor: pointer;
          transition: all 0.2s;
        }
        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .slider-thumb::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #39E48F;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
          transition: all 0.2s;
        }
        .slider-thumb::-moz-range-thumb:hover {
          box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.3);
          transform: scale(1.1);
        }
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #1f1f23;
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #2a2a2e;
        }
      `}</style>
    </div>
  );
};