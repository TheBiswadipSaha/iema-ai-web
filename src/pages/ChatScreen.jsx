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

  // Configuration for each page
//   const PageConfigs = {
//     '/select-tutor/ai-tutor': {
//       title: 'AI Tutor',
//       subtitle: 'Physics Specialist',
//       icon: <Sparkles size={20} />,
//       placeholder: 'Ask me anything about physics...',
//       filters: [
//         {
//           heading: 'Response Tone',
//           icon: <MessageSquare size={16} />,
//           options: [
//             { type: 'select', label: 'Tone', values: ['Professional', 'Friendly', 'Creative'] }
//           ]
//         },
//         {
//           heading: 'Teaching Style',
//           icon: <FileText size={16} />,
//           options: [
//             { type: 'checkbox', label: 'Explain quantum computing' },
//             { type: 'checkbox', label: 'Why does gravity work?' },
//             { type: 'checkbox', label: 'Teach calculus' }
//           ]
//         }
//       ]
//     },
//     '/blog-generator': {
//       title: 'Blog Generator',
//       subtitle: 'Create engaging content',
//       icon: <FileText size={20} />,
//       placeholder: 'Describe your blog topic...',
//       filters: [
//         {
//           heading: 'Content Settings',
//           icon: <FileText size={16} />,
//           options: [
//             { type: 'select', label: 'Tone', values: ['Professional', 'Casual', 'Persuasive', 'Informative'] },
//             { type: 'select', label: 'Length', values: ['Short (300-500 words)', 'Medium (500-1000 words)', 'Long (1000+ words)'] }
//           ]
//         },
//         {
//           heading: 'Style Options',
//           icon: <Sparkles size={16} />,
//           options: [
//             { type: 'checkbox', label: 'Include introduction' },
//             { type: 'checkbox', label: 'Add conclusion' },
//             { type: 'checkbox', label: 'Use bullet points' },
//             { type: 'checkbox', label: 'Add call-to-action' }
//           ]
//         }
//       ]
//     },
//     '/img-playground': {
//       title: 'Image Playground',
//       subtitle: 'Analyze & understand images',
//       icon: <Image size={20} />,
//       placeholder: 'Upload an image to analyze...',
//       allowImageUpload: true,
//       filters: [
//         {
//           heading: 'Analysis Type',
//           icon: <Sparkles size={16} />,
//           options: [
//             { type: 'checkbox', label: 'Detailed description' },
//             { type: 'checkbox', label: 'Object detection' },
//             { type: 'checkbox', label: 'Text extraction' },
//             { type: 'checkbox', label: 'Color analysis' }
//           ]
//         },
//         {
//           heading: 'Output Format',
//           icon: <FileText size={16} />,
//           options: [
//             { type: 'select', label: 'Format', values: ['Paragraph', 'Bullet points', 'Technical report'] }
//           ]
//         }
//       ]
//     },
//     '/web-summarizer': {
//       title: 'Web Summarizer',
//       subtitle: 'Summarize any webpage',
//       icon: <Globe size={20} />,
//       placeholder: 'Paste a URL or describe what to summarize...',
//       filters: [
//         {
//           heading: 'Summary Style',
//           icon: <FileText size={16} />,
//           options: [
//             { type: 'select', label: 'Length', values: ['Brief', 'Detailed', 'Comprehensive'] },
//             { type: 'select', label: 'Format', values: ['Paragraph', 'Bullet points', 'Key takeaways'] }
//           ]
//         },
//         {
//           heading: 'Focus Areas',
//           icon: <Sparkles size={16} />,
//           options: [
//             { type: 'checkbox', label: 'Main ideas only' },
//             { type: 'checkbox', label: 'Include statistics' },
//             { type: 'checkbox', label: 'Extract quotes' }
//           ]
//         }
//       ]
//     },
//     '/email-generator': {
//       title: 'Email Generator',
//       subtitle: 'Craft professional emails',
//       icon: <Mail size={20} />,
//       placeholder: 'Describe the email you need...',
//       filters: [
//         {
//           heading: 'Email Type',
//           icon: <Mail size={16} />,
//           options: [
//             { type: 'select', label: 'Type', values: ['Professional', 'Follow-up', 'Cold outreach', 'Thank you', 'Apology'] }
//           ]
//         },
//         {
//           heading: 'Tone & Length',
//           icon: <MessageSquare size={16} />,
//           options: [
//             { type: 'select', label: 'Tone', values: ['Formal', 'Semi-formal', 'Casual'] },
//             { type: 'select', label: 'Length', values: ['Short', 'Medium', 'Long'] }
//           ]
//         },
//         {
//           heading: 'Options',
//           icon: <Sparkles size={16} />,
//           options: [
//             { type: 'checkbox', label: 'Include subject line' },
//             { type: 'checkbox', label: 'Add signature' },
//             { type: 'checkbox', label: 'Include call-to-action' }
//           ]
//         }
//       ]
//     },
//     '/img-generator': {
//       title: 'Image Generator',
//       subtitle: 'Create stunning visuals',
//       icon: <Image size={20} />,
//       placeholder: 'Describe the image you want to create...',
//       actions: ['Generate', 'Enhance', 'Variation'],
//       filters: [
//         {
//           heading: 'Image Style',
//           icon: <Sparkles size={16} />,
//           options: [
//             { type: 'select', label: 'Style', values: ['Photorealistic', 'Digital Art', 'Oil Painting', '3D Render', 'Anime', 'Sketch'] }
//           ]
//         },
//         {
//           heading: 'Dimensions',
//           icon: <Image size={16} />,
//           options: [
//             { type: 'select', label: 'Aspect Ratio', values: ['1:1 (Square)', '16:9 (Landscape)', '9:16 (Portrait)', '4:3 (Standard)'] },
//             { type: 'select', label: 'Quality', values: ['Standard', 'High', 'Ultra'] }
//           ]
//         },
//         {
//           heading: 'Advanced',
//           icon: <Settings size={16} />,
//           options: [
//             { type: 'range', label: 'Creativity', min: 0, max: 100, default: 50 },
//             { type: 'range', label: 'Detail Level', min: 0, max: 100, default: 70 }
//           ]
//         }
//       ]
//     },
//     '/code-generator': {
//       title: 'Code Generator',
//       subtitle: 'Write code faster',
//       icon: <Code size={20} />,
//       placeholder: 'Describe what you want to build...',
//       filters: [
//         {
//           heading: 'Programming Language',
//           icon: <Code size={16} />,
//           options: [
//             { type: 'select', label: 'Language', values: ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'TypeScript'] }
//           ]
//         },
//         {
//           heading: 'Code Style',
//           icon: <FileText size={16} />,
//           options: [
//             { type: 'checkbox', label: 'Include comments' },
//             { type: 'checkbox', label: 'Add error handling' },
//             { type: 'checkbox', label: 'Use best practices' },
//             { type: 'checkbox', label: 'Include tests' }
//           ]
//         },
//         {
//           heading: 'Complexity',
//           icon: <Sparkles size={16} />,
//           options: [
//             { type: 'select', label: 'Level', values: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] }
//           ]
//         }
//       ]
//     }
//   };

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