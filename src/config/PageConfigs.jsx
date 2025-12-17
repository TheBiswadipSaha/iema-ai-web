import React from 'react';
import { Send, Image, Paperclip, Sparkles, FileText, Globe, Mail, Code, MessageSquare, Crown, Settings, History, Bot } from 'lucide-react';

export const PageConfigs = {
  'ai-tutor': {
    title: 'AI Tutor',
    toolName: 'AI Tutor',
    subtitle: 'Physics Specialist',
    icon: <Bot size={20} />,
    type: 'text',
    placeholder: 'Ask me anything about physics...',
    filters: [
      {
        heading: 'Response Tone',
        icon: <MessageSquare size={16} />,
        options: [
          { label: 'Professional', icon: '👔' },
          { label: 'Friendly', icon: '😊' },
          { label: 'Creative', icon: '🎨' }
        ]
      },
      {
        heading: 'Teaching Style',
        icon: <FileText size={16} />,
        options: [
          { label: 'Step-by-step', icon: '📝' },
          { label: 'Visual examples', icon: '🖼️' },
          { label: 'Practice problems', icon: '💡' }
        ]
      }
    ]
  },
  'blog-generator': {
    title: 'Blog Generator',
    toolName: 'Blog Generator',
    subtitle: 'Create engaging content',
    icon: <FileText size={20} />,
    type: 'text',
    placeholder: 'Describe your blog topic...',
    filters: [
      {
        heading: 'Content Settings',
        icon: <FileText size={16} />,
        options: [
          { label: 'Professional', icon: '💼' },
          { label: 'Casual', icon: '😎' },
          { label: 'Persuasive', icon: '🎯' },
          { label: 'Informative', icon: '📚' }
        ]
      },
      {
        heading: 'Length',
        icon: <Sparkles size={16} />,
        options: [
          { label: 'Short', icon: '📄' },
          { label: 'Medium', icon: '📃' },
          { label: 'Long', icon: '📖' }
        ]
      }
    ]
  },
  'web-summarizer': {
    title: 'Web Summarizer',
    toolName: 'Web Summarizer',
    subtitle: 'Summarize any webpage',
    icon: <Globe size={20} />,
    type: 'text',
    placeholder: 'Paste a URL or describe what to summarize...',
    filters: [
      {
        heading: 'Summary Style',
        icon: <FileText size={16} />,
        options: [
          { label: 'Brief', icon: '⚡' },
          { label: 'Detailed', icon: '📝' },
          { label: 'Comprehensive', icon: '📚' }
        ]
      },
      {
        heading: 'Focus Areas',
        icon: <Sparkles size={16} />,
        options: [
          { label: 'Main ideas only', icon: '💡' },
          { label: 'Include statistics', icon: '📊' },
          { label: 'Extract quotes', icon: '💬' }
        ]
      }
    ]
  },
  'email-generator': {
    title: 'Email Generator',
    toolName: 'Email Generator',
    subtitle: 'Craft professional emails',
    icon: <Mail size={20} />,
    type: 'text',
    placeholder: 'Describe the email you need...',
    filters: [
      {
        heading: 'Email Type',
        icon: <Mail size={16} />,
        options: [
          { label: 'Professional', icon: '💼' },
          { label: 'Follow-up', icon: '📧' },
          { label: 'Cold outreach', icon: '🎯' },
          { label: 'Thank you', icon: '🙏' },
          { label: 'Apology', icon: '😔' }
        ]
      },
      {
        heading: 'Tone & Length',
        icon: <MessageSquare size={16} />,
        options: [
          { label: 'Formal', icon: '🎩' },
          { label: 'Semi-formal', icon: '👔' },
          { label: 'Casual', icon: '😊' }
        ]
      }
    ]
  },
  'image-generator': {
    title: 'Image Generator',
    toolName: 'Image Generator',
    subtitle: 'Create stunning visuals',
    icon: <Image size={20} />,
    type: 'image',
    allowImageUpload: false,
    placeholder: 'Describe the image you want to create...',
    actions: ['Generate', 'Enhance', 'Variation'],
    filters: [
      {
        heading: 'Image Style',
        icon: <Sparkles size={16} />,
        options: [
          { label: 'Photorealistic', icon: '📷' },
          { label: 'Digital Art', icon: '🎨' },
          { label: 'Oil Painting', icon: '🖌️' },
          { label: '3D Render', icon: '🎮' },
          { label: 'Anime', icon: '🎌' },
          { label: 'Sketch', icon: '✏️' }
        ]
      },
      {
        heading: 'Aspect Ratio',
        icon: <Image size={16} />,
        options: [
          { label: '1:1 Square', icon: '◻️' },
          { label: '16:9 Landscape', icon: '▭' },
          { label: '9:16 Portrait', icon: '▯' }
        ]
      }
    ]
  },
  'code-generator': {
    title: 'Code Generator',
    toolName: 'Code Generator',
    subtitle: 'Write code faster',
    icon: <Code size={20} />,
    type: 'text',
    placeholder: 'Describe what you want to build...',
    filters: [
      {
        heading: 'Programming Language',
        icon: <Code size={16} />,
        options: [
          { label: 'JavaScript', icon: '🟨' },
          { label: 'Python', icon: '🐍' },
          { label: 'Java', icon: '☕' },
          { label: 'C++', icon: '⚡' },
          { label: 'Go', icon: '🔵' },
          { label: 'Rust', icon: '🦀' },
          { label: 'TypeScript', icon: '💙' }
        ]
      },
      {
        heading: 'Code Style',
        icon: <FileText size={16} />,
        options: [
          { label: 'Include comments', icon: '💬' },
          { label: 'Error handling', icon: '🛡️' },
          { label: 'Best practices', icon: '✅' },
          { label: 'Include tests', icon: '🧪' }
        ]
      }
    ]
  },
  'image-analyzer': {
    title: 'Image Analyzer',
    toolName: 'Image Playground',
    subtitle: 'Analyze & understand images',
    icon: <Sparkles size={20} />,
    type: 'vision',
    allowImageUpload: true,
    placeholder: 'Describe the image you want to analyze...',
    filters: [
      {
        heading: 'Image Style',
        icon: <Sparkles size={16} />,
        options: [
          { label: 'Cinematic', icon: '🎬' },
          { label: 'Animated', icon: '🎨' },
          { label: 'Documentary', icon: '📹' }
        ]
      },
      {
        heading: 'Duration',
        icon: <FileText size={16} />,
        options: [
          { label: 'Short', icon: '⏱️' },
          { label: 'Medium', icon: '⏲️' },
          { label: 'Long', icon: '⏰' }
        ]
      }
    ]
  }
};