import React from 'react';
import { Send, Image, Paperclip, Sparkles, FileText, Globe, Mail, Code, MessageSquare, Crown, Settings, History, Bot } from 'lucide-react';

export const PageConfigs = {
    '/select-tutor/ai-tutor': {
      title: 'AI Tutor',
      subtitle: 'Physics Specialist',
      icon: <Bot size={20} />,
      placeholder: 'Ask me anything about physics...',
      filters: [
        {
          heading: 'Response Tone',
          icon: <MessageSquare size={16} />,
          options: [
            { type: 'select', label: 'Tone', values: ['Professional', 'Friendly', 'Creative'] }
          ]
        },
        {
          heading: 'Teaching Style',
          icon: <FileText size={16} />,
          options: [
            { type: 'checkbox', label: 'Explain quantum computing' },
            { type: 'checkbox', label: 'Why does gravity work?' },
            { type: 'checkbox', label: 'Teach calculus' }
          ]
        }
      ]
    },
    '/blog-generator': {
      title: 'Blog Generator',
      subtitle: 'Create engaging content',
      icon: <FileText size={20} />,
      placeholder: 'Describe your blog topic...',
      filters: [
        {
          heading: 'Content Settings',
          icon: <FileText size={16} />,
          options: [
            { type: 'select', label: 'Tone', values: ['Professional', 'Casual', 'Persuasive', 'Informative'] },
            { type: 'select', label: 'Length', values: ['Short (300-500 words)', 'Medium (500-1000 words)', 'Long (1000+ words)'] }
          ]
        },
        {
          heading: 'Style Options',
          icon: <Sparkles size={16} />,
          options: [
            { type: 'checkbox', label: 'Include introduction' },
            { type: 'checkbox', label: 'Add conclusion' },
            { type: 'checkbox', label: 'Use bullet points' },
            { type: 'checkbox', label: 'Add call-to-action' }
          ]
        }
      ]
    },
    '/img-playground': {
      title: 'Image Playground',
      subtitle: 'Analyze & understand images',
      icon: <Image size={20} />,
      placeholder: 'Upload an image to analyze...',
      allowImageUpload: true,
      filters: [
        {
          heading: 'Analysis Type',
          icon: <Sparkles size={16} />,
          options: [
            { type: 'checkbox', label: 'Detailed description' },
            { type: 'checkbox', label: 'Object detection' },
            { type: 'checkbox', label: 'Text extraction' },
            { type: 'checkbox', label: 'Color analysis' }
          ]
        },
        {
          heading: 'Output Format',
          icon: <FileText size={16} />,
          options: [
            { type: 'select', label: 'Format', values: ['Paragraph', 'Bullet points', 'Technical report'] }
          ]
        }
      ]
    },
    '/web-summarizer': {
      title: 'Web Summarizer',
      subtitle: 'Summarize any webpage',
      icon: <Globe size={20} />,
      placeholder: 'Paste a URL or describe what to summarize...',
      filters: [
        {
          heading: 'Summary Style',
          icon: <FileText size={16} />,
          options: [
            { type: 'select', label: 'Length', values: ['Brief', 'Detailed', 'Comprehensive'] },
            { type: 'select', label: 'Format', values: ['Paragraph', 'Bullet points', 'Key takeaways'] }
          ]
        },
        {
          heading: 'Focus Areas',
          icon: <Sparkles size={16} />,
          options: [
            { type: 'checkbox', label: 'Main ideas only' },
            { type: 'checkbox', label: 'Include statistics' },
            { type: 'checkbox', label: 'Extract quotes' }
          ]
        }
      ]
    },
    '/email-generator': {
      title: 'Email Generator',
      subtitle: 'Craft professional emails',
      icon: <Mail size={20} />,
      placeholder: 'Describe the email you need...',
      filters: [
        {
          heading: 'Email Type',
          icon: <Mail size={16} />,
          options: [
            { type: 'select', label: 'Type', values: ['Professional', 'Follow-up', 'Cold outreach', 'Thank you', 'Apology'] }
          ]
        },
        {
          heading: 'Tone & Length',
          icon: <MessageSquare size={16} />,
          options: [
            { type: 'select', label: 'Tone', values: ['Formal', 'Semi-formal', 'Casual'] },
            { type: 'select', label: 'Length', values: ['Short', 'Medium', 'Long'] }
          ]
        },
        {
          heading: 'Options',
          icon: <Sparkles size={16} />,
          options: [
            { type: 'checkbox', label: 'Include subject line' },
            { type: 'checkbox', label: 'Add signature' },
            { type: 'checkbox', label: 'Include call-to-action' }
          ]
        }
      ]
    },
    '/img-generator': {
      title: 'Image Generator',
      subtitle: 'Create stunning visuals',
      icon: <Image size={20} />,
      placeholder: 'Describe the image you want to create...',
      actions: ['Generate', 'Enhance', 'Variation'],
      filters: [
        {
          heading: 'Image Style',
          icon: <Sparkles size={16} />,
          options: [
            { type: 'select', label: 'Style', values: ['Photorealistic', 'Digital Art', 'Oil Painting', '3D Render', 'Anime', 'Sketch'] }
          ]
        },
        {
          heading: 'Dimensions',
          icon: <Image size={16} />,
          options: [
            { type: 'select', label: 'Aspect Ratio', values: ['1:1 (Square)', '16:9 (Landscape)', '9:16 (Portrait)', '4:3 (Standard)'] },
            { type: 'select', label: 'Quality', values: ['Standard', 'High', 'Ultra'] }
          ]
        },
        {
          heading: 'Advanced',
          icon: <Settings size={16} />,
          options: [
            { type: 'range', label: 'Creativity', min: 0, max: 100, default: 50 },
            { type: 'range', label: 'Detail Level', min: 0, max: 100, default: 70 }
          ]
        }
      ]
    },
    '/code-generator': {
      title: 'Code Generator',
      subtitle: 'Write code faster',
      icon: <Code size={20} />,
      placeholder: 'Describe what you want to build...',
      filters: [
        {
          heading: 'Programming Language',
          icon: <Code size={16} />,
          options: [
            { type: 'select', label: 'Language', values: ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'TypeScript'] }
          ]
        },
        {
          heading: 'Code Style',
          icon: <FileText size={16} />,
          options: [
            { type: 'checkbox', label: 'Include comments' },
            { type: 'checkbox', label: 'Add error handling' },
            { type: 'checkbox', label: 'Use best practices' },
            { type: 'checkbox', label: 'Include tests' }
          ]
        },
        {
          heading: 'Complexity',
          icon: <Sparkles size={16} />,
          options: [
            { type: 'select', label: 'Level', values: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] }
          ]
        }
      ]
    }
  };