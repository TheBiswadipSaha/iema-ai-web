import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Send, Image, Paperclip, Sparkles, FileText, Globe, Mail, Code, MessageSquare, Crown, Settings, History } from 'lucide-react';
import {ChattingSidebar} from '../components/ChattingSidebar'
import {PromptSender} from '../components/PromptSender'
import { PageConfigs } from '../config/pageConfigs';

export const ChatScreen = () => {
  const location = useLocation();
  const path = location.pathname;
  console.log('Current path:', path);
  const currentConfig = PageConfigs[path];

  return (
    <div className="flex h-screen bg-[#101214]">
      <ChattingSidebar pageConfig={currentConfig} />
      
      <div className="flex-1 flex flex-col">
        {/* Main Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              {currentConfig.icon}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              I am Wesley, your {currentConfig.title}
            </h1>
            <p className="text-gray-400 mb-8">
              {currentConfig.subtitle === 'Physics Specialist' 
                ? 'Ask me anything—from foundational principles to advanced physics and I’ll break it down into simple, intuitive explanations designed to help you truly understand.'
                : `Let me help you with ${currentConfig.subtitle.toLowerCase()}`}
            </p>
            
            <div className="flex gap-3 justify-center flex-wrap">
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm">
                {currentConfig.title === 'AI Tutor' ? 'Explain quantum computing' : 'Quick start'}
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm">
                {currentConfig.title === 'AI Tutor' ? 'Why does gravity work?' : 'See examples'}
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm">
                {currentConfig.title === 'AI Tutor' ? 'Teach calculus' : 'Learn more'}
              </button>
            </div>
          </div>
        </div>

        {/* Prompt Sender at Bottom */}
        <div className=' flex justify-center items-center'>
            <PromptSender pageConfig={currentConfig} />
        </div>
      </div>
    </div>
  );
};