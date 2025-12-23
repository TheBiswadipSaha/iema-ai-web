import React, { useState, useEffect } from 'react';
import { ChevronDown, X, Sliders, CreditCard, MessageSquare, ArrowRight, Clock, Coins, WandSparkles, History, Image } from 'lucide-react';

import LanguageSelector from './LanguageSelector';
import BuyCreditsModal from '../utils/BuyCreditsModal';
import { useHttp } from '../hooks/useHttp';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ChattingSidebar = ({ pageConfig, onFilterChange, toolName }) => {
  const [width, setWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const [filters, setFilters] = useState({});
  const [expanded, setExpanded] = useState({});
  const [sliders, setSliders] = useState({});
  const [activeTab, setActiveTab] = useState('generate');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const { getReq } = useHttp();
  const { token } = useAuth();
  const navigate = useNavigate();
  const score = localStorage.getItem('unknown') || sessionStorage.getItem('unknown') || 0;

  // Initialize default filters from pageConfig
  useEffect(() => {
    if (!pageConfig?.filters) return;
    
    const defaults = {};
    pageConfig.filters.forEach(section => {
      if (section.default) {
        defaults[section.heading] = section.default;
      }
    });
    
    if (Object.keys(defaults).length > 0) {
      setFilters(defaults);
      setSliders(defaults);
      onFilterChange?.(defaults);
    }
  }, [pageConfig]);

  // Handle resize
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const newWidth = Math.min(Math.max(e.clientX, 280), 600);
      setWidth(newWidth);
    };

    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
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
    if (!toolName) return;
    setLoading(true);
    try {
      const response = await getReq(`api/conversations/get-all-conversations?toolName=${encodeURIComponent(toolName)}`, token);
      if (response?.data) setConversations(response.data);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'history' && toolName) fetchConversations();
  };

  useEffect(() => {
    if (activeTab === 'history' && toolName && conversations.length === 0) {
      fetchConversations();
    }
  }, [activeTab, toolName]);

  const handleConversationClick = (conversationId) => {
    if (!conversationId) return;
    const urlFriendlyToolName = toolName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    navigate(`/chat/${urlFriendlyToolName}/${conversationId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    const diffDays = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const renderFilterInput = (section) => {
    const { inputType, placeholder, options, heading, min = 0, max = 100, default: defaultVal = 50 } = section;
    
    switch (inputType) {
      case 'slider':
        return (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs">Level</span>
              <span className="text-emerald-400 text-sm font-semibold">{sliders[heading] || defaultVal}%</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              value={sliders[heading] || defaultVal}
              onChange={(e) => handleSlider(heading, e.target.value)}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${sliders[heading] || defaultVal}%, #1f1f23 ${sliders[heading] || defaultVal}%, #1f1f23 100%)`
              }}
            />
          </div>
        );
      
      case 'languageSelector':
        return (
          <LanguageSelector 
            defaultLanguage={filters[heading] || defaultVal}
            onLanguageChange={(language) => updateFilters({ ...filters, [heading]: language })}
          />
        );
      
      case 'text':
      case 'number':
        return (
          <input
            type={inputType}
            placeholder={placeholder}
            className="w-full mt-3 px-3 py-2.5 bg-[#131316] border border-gray-700/50 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
          />
        );
      
      case 'dropdown':
        return (
          <select className="w-full mt-3 px-3 py-2.5 bg-[#131316] border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20">
            {options.map((opt, i) => (
              <option key={i} value={opt.label}>{opt.label}</option>
            ))}
          </select>
        );
      
      case 'file':
        return (
          <div className="mt-3 border-2 border-dashed border-gray-700/50 rounded-lg p-6 text-center hover:border-emerald-500/50 transition-all cursor-pointer bg-[#131316]">
            <Image size={32} className="mx-auto text-gray-600 mb-2" />
            <p className="text-emerald-400 text-sm font-medium mb-1">{placeholder || 'Click to upload'}</p>
            <p className="text-gray-500 text-xs">{section.acceptedFormats?.join(', ')} (max {section.maxSize})</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  const activeCount = Object.values(filters).filter(Boolean).length;
  if (!pageConfig?.filters) return null;

  return (
    <div 
      className="relative bg-[#0A0A0B] border-r border-gray-800/50 h-screen overflow-hidden flex flex-col"
      style={{ width: `${width}px`, minWidth: '280px', maxWidth: '600px' }}
    >
      {/* Resize Handle */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-1 hover:w-1.5 cursor-col-resize z-50 transition-all ${
          isResizing ? 'bg-emerald-500 w-1.5' : 'bg-transparent hover:bg-emerald-500/50'
        }`}
        onMouseDown={(e) => { setIsResizing(true); e.preventDefault(); }}
        style={{ cursor: 'col-resize', touchAction: 'none' }}
      />

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
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
            {['generate', 'history'].map(tab => (
              <button 
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 flex cursor-pointer items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                {tab === 'generate' ? <WandSparkles size={18} /> : <History size={18} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Header */}
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
                <X size={14} /> Clear
              </button>
            )}
          </div>
        )}

        {/* Filter Sections */}
        {activeTab === 'generate' && (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {pageConfig.filters.map((section, idx) => {
              const isExpanded = expanded[section.heading] !== false;
              
              return (
                <div key={idx} className="rounded-xl border border-gray-800/50 bg-[#0F0F11] overflow-hidden hover:border-gray-700/50">
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

                  {isExpanded && (
                    <div className="p-4 pt-0 mt-4">
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

                      {renderFilterInput(section)}

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
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* History Section */}
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
                <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-full mb-4 border border-emerald-500/20">
                  <History size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-lg">No conversations yet</h3>
                <p className="text-gray-500 text-sm max-w-[240px]">
                  Your conversation history will appear here once you start generating content.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {conversations.map((conv, idx) => (
                  <div
                    key={conv.id || idx}
                    onClick={() => handleConversationClick(conv.id)}
                    className="group relative rounded-xl border border-gray-800/50 bg-[#0F0F11] p-4 hover:border-emerald-500/40 hover:bg-gray-800/40 transition-all cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-3 gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-semibold line-clamp-2 group-hover:text-[#39E48F] transition-colors mb-1">
                            {conv.title || 'Untitled Conversation'}
                          </h4>
                          {conv.preview && (
                            <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{conv.preview}</p>
                          )}
                        </div>
                        <ArrowRight size={18} className="text-gray-600 group-hover:text-[#39E48F] group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-800/50">
                        <div className="flex items-center gap-2 flex-wrap">
                          {conv.messageCount !== undefined && (
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-800/60 rounded-md">
                              <MessageSquare size={12} className="text-gray-400" />
                              <span className="text-gray-400 text-xs font-medium">{conv.messageCount}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-gray-500 whitespace-nowrap">
                          <Clock size={12} className="text-gray-600" />
                          <span>{formatDate(conv.createdAt)}</span>
                          {conv.createdAt && <span className="text-gray-600">• {formatTime(conv.createdAt)}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Credits Section */}
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
            <button 
              className="w-full bg-[#39E48F] hover:from-emerald-600 hover:to-emerald-700 text-black rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-emerald-500/20" 
              onClick={() => setShowBuyModal(true)}
            >
              <Coins size={16} />
              Buy More Credit
            </button>
          </div>
        </div>
      </div>

      {showBuyModal && <BuyCreditsModal open={showBuyModal} onClose={() => setShowBuyModal(false)} />}

      <style>{`
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