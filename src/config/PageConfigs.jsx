import React from 'react';
import { Send, Image, Paperclip, Sparkles, FileText, Globe, Mail, Code, MessageSquare, Crown, Settings, History, Bot } from 'lucide-react';

export const PageConfigs = {
    'ai-tutor': {
      title: 'AI Tutor',
      subtitle: 'Physics Specialist',
      icon: <Bot size={20} />,
      placeholder: 'Ask me anything about physics...',
      filters: [
        {
          heading: 'Response Tone',
          icon: <MessageSquare size={16} />,
          options: [
            { type: 'select', label: 'Professional', icon: '👔' },
            { type: 'select', label: 'Friendly', icon: '😊' },
            { type: 'select', label: 'Creative', icon: '🎨' }
          ]
        },
        {
          heading: 'Teaching Style',
          icon: <FileText size={16} />,
          options: [
            { type: 'checkbox', label: 'Step-by-step', icon: '📝' },
            { type: 'checkbox', label: 'Visual examples', icon: '🖼️' },
            { type: 'checkbox', label: 'Practice problems', icon: '💡' }
          ]
        }
      ]
    },
    'blog-generator': {
      title: 'Blog Generator',
      subtitle: 'Create engaging content',
      icon: <FileText size={20} />,
      placeholder: 'Describe your blog topic...',
      filters: [
        {
          heading: 'Content Settings',
          icon: <FileText size={16} />,
          options: [
            { type: 'select', label: 'Professional', icon: '💼' },
            { type: 'select', label: 'Casual', icon: '😎' },
            { type: 'select', label: 'Persuasive', icon: '🎯' },
            { type: 'select', label: 'Informative', icon: '📚' }
          ]
        },
        {
          heading: 'Length',
          icon: <Sparkles size={16} />,
          options: [
            { type: 'checkbox', label: 'Short', icon: '📄' },
            { type: 'checkbox', label: 'Medium', icon: '📃' },
            { type: 'checkbox', label: 'Long', icon: '📖' }
          ]
        }
      ]
    },
    'image-generator': {
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
            { type: 'checkbox', label: 'Detailed description', icon: '🔍' },
            { type: 'checkbox', label: 'Object detection', icon: '🎯' },
            { type: 'checkbox', label: 'Text extraction', icon: '📝' },
            { type: 'checkbox', label: 'Color analysis', icon: '🎨' }
          ]
        },
        {
          heading: 'Output Format',
          icon: <FileText size={16} />,
          options: [
            { type: 'select', label: 'Paragraph', icon: '📄' },
            { type: 'select', label: 'Bullet points', icon: '•' },
            { type: 'select', label: 'Technical report', icon: '📊' }
          ]
        }
      ]
    },
    'web-summarizer': {
      title: 'Web Summarizer',
      subtitle: 'Summarize any webpage',
      icon: <Globe size={20} />,
      placeholder: 'Paste a URL or describe what to summarize...',
      filters: [
        {
          heading: 'Summary Style',
          icon: <FileText size={16} />,
          options: [
            { type: 'select', label: 'Brief', icon: '⚡' },
            { type: 'select', label: 'Detailed', icon: '📝' },
            { type: 'select', label: 'Comprehensive', icon: '📚' }
          ]
        },
        {
          heading: 'Focus Areas',
          icon: <Sparkles size={16} />,
          options: [
            { type: 'checkbox', label: 'Main ideas only', icon: '💡' },
            { type: 'checkbox', label: 'Include statistics', icon: '📊' },
            { type: 'checkbox', label: 'Extract quotes', icon: '💬' }
          ]
        }
      ]
    },
    'email-generator': {
      title: 'Email Generator',
      subtitle: 'Craft professional emails',
      icon: <Mail size={20} />,
      placeholder: 'Describe the email you need...',
      filters: [
        {
          heading: 'Email Type',
          icon: <Mail size={16} />,
          options: [
            { type: 'select', label: 'Professional', icon: '💼' },
            { type: 'select', label: 'Follow-up', icon: '📧' },
            { type: 'select', label: 'Cold outreach', icon: '🎯' },
            { type: 'select', label: 'Thank you', icon: '🙏' },
            { type: 'select', label: 'Apology', icon: '😔' }
          ]
        },
        {
          heading: 'Tone & Length',
          icon: <MessageSquare size={16} />,
          options: [
            { type: 'select', label: 'Formal', icon: '🎩' },
            { type: 'select', label: 'Semi-formal', icon: '👔' },
            { type: 'select', label: 'Casual', icon: '😊' }
          ]
        }
      ]
    },
    'img-generator': {
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
            { type: 'select', label: 'Photorealistic', icon: '📷' },
            { type: 'select', label: 'Digital Art', icon: '🎨' },
            { type: 'select', label: 'Oil Painting', icon: '🖌️' },
            { type: 'select', label: '3D Render', icon: '🎮' },
            { type: 'select', label: 'Anime', icon: '🎌' },
            { type: 'select', label: 'Sketch', icon: '✏️' }
          ]
        },
        {
          heading: 'Dimensions',
          icon: <Image size={16} />,
          options: [
            { type: 'checkbox', label: '1:1 Square', icon: '◻️' },
            { type: 'checkbox', label: '16:9 Landscape', icon: '▭' },
            { type: 'checkbox', label: '9:16 Portrait', icon: '▯' }
          ]
        }
      ]
    },
    'code-generator': {
      title: 'Code Generator',
      subtitle: 'Write code faster',
      icon: <Code size={20} />,
      placeholder: 'Describe what you want to build...',
      filters: [
        {
          heading: 'Programming Language',
          icon: <Code size={16} />,
          options: [
            { type: 'select', label: 'JavaScript', icon: '🟨' },
            { type: 'select', label: 'Python', icon: '🐍' },
            { type: 'select', label: 'Java', icon: '☕' },
            { type: 'select', label: 'C++', icon: '⚡' },
            { type: 'select', label: 'Go', icon: '🔵' },
            { type: 'select', label: 'Rust', icon: '🦀' },
            { type: 'select', label: 'TypeScript', icon: '💙' }
          ]
        },
        {
          heading: 'Code Style',
          icon: <FileText size={16} />,
          options: [
            { type: 'checkbox', label: 'Include comments', icon: '💬' },
            { type: 'checkbox', label: 'Error handling', icon: '🛡️' },
            { type: 'checkbox', label: 'Best practices', icon: '✅' },
            { type: 'checkbox', label: 'Include tests', icon: '🧪' }
          ]
        }
      ]
    },
    'image-playground': {
      title: 'Image Playground',
      subtitle: 'Analyze & understand images',
      icon: <Sparkles size={20} />,
      placeholder: 'Describe the image you want to analyze...',
      filters: [
        {
          heading: 'Image Style',
          icon: <Sparkles size={16} />,
          options: [
            { type: 'select', label: 'Cinematic', icon: '🎬' },
            { type: 'select', label: 'Animated', icon: '🎨' },
            { type: 'select', label: 'Documentary', icon: '📹' }
          ]
        },
        {
          heading: 'Duration',
          icon: <FileText size={16} />,
          options: [
            { type: 'checkbox', label: 'Short', icon: '⏱️' },
            { type: 'checkbox', label: 'Medium', icon: '⏲️' },
            { type: 'checkbox', label: 'Long', icon: '⏰' }
          ]
        }
      ]
    }
};