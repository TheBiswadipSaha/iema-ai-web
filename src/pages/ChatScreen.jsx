import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Image, Paperclip } from 'lucide-react';
import gsap from 'gsap';
import { ChattingSidebar } from '../components/ChattingSidebar';
import { PromptSender } from '../components/PromptSender';
import { PageConfigs } from '../config/pageConfigs';

export const ChatScreen = () => {
    const location = useLocation();
    const path = location.pathname;
    const currentConfig = PageConfigs[path];

    // Refs for animation
    const avatarRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonsRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        
        tl.fromTo(
            avatarRef.current,
            {
                x: -300,
                y: -200,
                scale: 0.5,
                opacity: 0
            },
            {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }
        )
        .fromTo(
            titleRef.current,
            {
                y: -50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            },
            '-=0.4'
        )
        .fromTo(
            subtitleRef.current,
            {
                y: -30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            },
            '-=0.4'
        )
        .fromTo(
            buttonsRef.current.children,
            {
                y: 20,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power2.out'
            },
            '-=0.3'
        );
    }, []);

    return (
        <div className="flex h-screen bg-[#101214]">
            <ChattingSidebar pageConfig={currentConfig} />
            
            <div className="flex-1 flex flex-col">
                {/* Main Chat Area */}
                <div className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
                    <div className="text-center max-w-2xl">
                        <div 
                            ref={avatarRef}
                            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            {currentConfig?.icon}
                        </div>
                        
                        <h1 
                            ref={titleRef}
                            className="text-3xl font-bold text-white mb-2"
                        >
                            I am Wesley, your {currentConfig?.title}
                        </h1>
                        
                        <p 
                            ref={subtitleRef}
                            className="text-gray-400 mb-8"
                        >
                            {currentConfig?.subtitle === 'Physics Specialist' 
                                ? 'Ask me anything - from foundational principles to advanced physics and I\'ll break it down into simple, intuitive explanations designed to help you truly understand.'
                                : `Let me help you with ${currentConfig?.subtitle?.toLowerCase()}`}
                        </p>
                        
                        <div 
                            ref={buttonsRef}
                            className="flex gap-3 justify-center flex-wrap"
                        >
                            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors">
                                {currentConfig?.title === 'AI Tutor' ? 'Explain quantum computing' : 'Quick start'}
                            </button>
                            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors">
                                {currentConfig?.title === 'AI Tutor' ? 'Why does gravity work?' : 'See examples'}
                            </button>
                            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors">
                                {currentConfig?.title === 'AI Tutor' ? 'Teach calculus' : 'Learn more'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Prompt Sender at Bottom */}
                <div className='flex justify-center items-center'>
                    <PromptSender pageConfig={currentConfig} />
                </div>
            </div>
        </div>
    );
};