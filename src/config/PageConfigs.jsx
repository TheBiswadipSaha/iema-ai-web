import React from 'react';
import { 
  Send, Image, Paperclip, Sparkles, FileText, Globe, Mail, Code, 
  MessageSquare, Crown, Settings, History, Bot, Zap, Palette, 
  Layout, Monitor, Sliders, Camera, Film, Type, AlignLeft, 
  Clock, Star, Target, Heart, Frown, FileCode, Shield, CheckCircle, 
  TestTube, Newspaper, Users, Lightbulb, BarChart, MessageCircle,
  Smile, Wand2, BookOpen, GraduationCap, TrendingUp
} from 'lucide-react';

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
        heading: 'Select tone for IEMA AI Tutor',
        icon: <MessageSquare size={16} />,
        options: [
          { label: 'Formal', icon: <FileText size={14} /> },
          { label: 'Casual', icon: <Smile size={14} /> },
          { label: 'Creative', icon: <Wand2 size={14} /> },
          { label: 'Professional', icon: <Users size={14} /> },
          { label: 'Informative', icon: <BookOpen size={14} /> }
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
        heading: 'Tone',
        icon: <MessageSquare size={16} />,
        options: [
          { label: 'Formal', icon: <FileText size={14} /> },
          { label: 'Friendly', icon: <Smile size={14} /> },
          { label: 'Creative', icon: <Wand2 size={14} /> },
          { label: 'Professional', icon: <Users size={14} /> },
          { label: 'Informative', icon: <BookOpen size={14} /> }
        ]
      },
      {
        heading: 'Type of Blog',
        icon: <Type size={16} />,
        options: [
          { label: 'Concise', icon: <AlignLeft size={14} /> },
          { label: 'Comprehensive', icon: <FileText size={14} /> },
          { label: 'Detailed', icon: <Sparkles size={14} /> }
        ]
      },
      {
        heading: 'Keywords',
        icon: <Target size={16} />,
        inputType: 'text',
        placeholder: 'Enter keywords separated by commas...'
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
        heading: 'Tone',
        icon: <MessageSquare size={16} />,
        options: [
          { label: 'Default', icon: <FileText size={14} /> },
          { label: 'Professional', icon: <Users size={14} /> },
          { label: 'Casual', icon: <Smile size={14} /> },
          { label: 'Technical', icon: <Code size={14} /> },
          { label: 'Simple', icon: <AlignLeft size={14} /> }
        ]
      },
      {
        heading: 'Summary Length',
        icon: <AlignLeft size={16} />,
        options: [
          { label: '512 words', icon: <FileText size={14} /> },
          { label: '1024 words', icon: <FileText size={14} /> },
          { label: '2048 words', icon: <FileText size={14} /> }
        ],
        inputType: 'number',
        placeholder: '1024'
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
        heading: 'Email generation options',
        icon: <Mail size={16} />,
        options: [
          { label: 'Conversational', icon: <MessageCircle size={14} /> },
          { label: 'Compact', icon: <AlignLeft size={14} /> },
          { label: 'Detailed', icon: <FileText size={14} /> }
        ]
      },
      {
        heading: 'Creativity',
        icon: <Wand2 size={16} />,
        inputType: 'slider',
        min: 0,
        max: 100,
        default: 50
      },
      {
        heading: 'Additional Details',
        icon: <Sparkles size={16} />,
        fields: [
          { label: 'To', placeholder: 'To' },
          { label: 'From', placeholder: 'From' },
          { label: 'Keywords', placeholder: 'Keywords (Optional)' }
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
    // actions: ['Generate', 'Enhance', 'Variation'],
    filters: [
      {
        heading: 'Style',
        icon: <Palette size={16} />,
        options: [
          { label: 'Small', icon: <Layout size={14} /> },
          { label: 'Medium', icon: <Monitor size={14} /> },
          { label: 'Large', icon: <Layout size={14} /> }
        ]
      },
      {
        heading: 'Size',
        icon: <Layout size={16} />,
        options: [
          { label: 'Fantasy', icon: <Wand2 size={14} /> },
          { label: 'Sci-Fi', icon: <Zap size={14} /> },
          { label: 'Realistic', icon: <Camera size={14} /> },
          { label: 'Abstract', icon: <Sparkles size={14} /> },
          { label: 'Vintage', icon: <Clock size={14} /> }
        ]
      },
      {
        heading: 'Genre',
        icon: <Star size={16} />,
        options: [
          { label: 'Trending', icon: <TrendingUp size={14} /> },
          { label: 'Classic', icon: <Star size={14} /> },
          { label: 'Modern', icon: <Zap size={14} /> }
        ]
      },
      {
        heading: 'Aspect Ratio',
        icon: <Layout size={16} />,
        options: [
          { label: '1:1', icon: <Layout size={14} /> },
          { label: '16:9', icon: <Monitor size={14} /> },
          { label: '3:4', icon: <Layout size={14} /> }
        ]
      },
      {
        heading: 'Quality',
        icon: <Sparkles size={16} />,
        options: [
          { label: 'HD', icon: <Monitor size={14} /> },
          { label: 'Standard', icon: <Layout size={14} /> }
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
    allowImageUpload: true,
    placeholder: 'Upload code file & Describe what you want to build...',
    filters: [
      {
        heading: 'Complexity',
        icon: <Sliders size={16} />,
        options: [
          { label: 'Amateur', icon: <GraduationCap size={14} /> },
          { label: 'Intermediate', icon: <TrendingUp size={14} /> },
          { label: 'Professional', icon: <Users size={14} /> },
          { label: 'Expert', icon: <Crown size={14} /> }
        ]
      },
      {
        heading: 'Language',
        icon: <Code size={16} />,
        inputType: 'languageSelector',
        default: 'Python',
        options: [
          { label: 'Python', icon: <Code size={14} /> },
          { label: 'JavaScript', icon: <Code size={14} /> },
          { label: 'Java', icon: <Code size={14} /> },
          { label: 'C++', icon: <Code size={14} /> },
          { label: 'Go', icon: <Code size={14} /> },
          { label: 'Rust', icon: <Code size={14} /> },
          { label: 'TypeScript', icon: <Code size={14} /> }
        ],
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
        heading: 'Select Tone',
        icon: <MessageSquare size={16} />,
        options: [
          { label: 'Formal', icon: <FileText size={14} /> },
          { label: 'Friendly', icon: <Smile size={14} /> },
          { label: 'Creative', icon: <Wand2 size={14} /> },
          { label: 'Professional', icon: <Users size={14} /> },
          { label: 'Informative', icon: <BookOpen size={14} /> }
        ]
      },
      // {
      //   heading: 'Upload Image',
      //   icon: <Image size={16} />,
      //   inputType: 'file',
      //   acceptedFormats: ['JPG', 'PNG', 'JPEG'],
      //   maxSize: '10MB'
      // }
    ]
  },
  // 'image-playground': {
  //   title: 'Image Playground',
  //   subtitle: 'Upload and analyze images',
  //   icon: <Image size={20} />,
  //   type: 'vision',
  //   allowImageUpload: true,
  //   placeholder: 'Describe what you want...',
  //   filters: [
  //     {
  //       heading: 'Upload Image',
  //       icon: <Image size={16} />,
  //       inputType: 'file',
  //       acceptedFormats: ['JPG', 'PNG', 'JPEG'],
  //       maxSize: '10MB',
  //       placeholder: 'Click to upload'
  //     },
  //     {
  //       heading: 'Select Tone',
  //       icon: <MessageSquare size={16} />,
  //       options: [
  //         { label: 'Formal', icon: <FileText size={14} /> },
  //         { label: 'Friendly', icon: <Smile size={14} /> },
  //         { label: 'Creative', icon: <Wand2 size={14} /> },
  //         { label: 'Professional', icon: <Users size={14} /> },
  //         { label: 'Informative', icon: <BookOpen size={14} /> }
  //       ]
  //     }
  //   ]
  // }
};