import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Image, Paperclip } from 'lucide-react';
import gsap from 'gsap';
import { ChattingSidebar } from '../components/ChattingSidebar';
import { PromptSender } from '../components/PromptSender';
import { PageConfigs } from '../config/pageConfigs';

export const ChatScreen = () => {
    const { type, chatId } = useParams();
    const navigate = useNavigate();
    const currentConfig = PageConfigs[type];
    
    const [messages, setMessages] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(chatId || null);

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

    // Handle sending messages
    const handleSendMessage = (message) => {
        // If this is the first message and we don't have a chatId yet
        if (!currentChatId && messages.length === 0) {
            // Generate a new chat ID (you can use UUID or timestamp)
            const newChatId = `chat_${Date.now()}`;
            setCurrentChatId(newChatId);
            
            // Update URL with the new chat ID
            navigate(`/chat/${type}/${newChatId}`, { replace: true });
        }

        // Add the message to the chat
        setMessages(prev => [...prev, { text: message, sender: 'user' }]);

        // Simulate AI response (replace with actual API call)
        setTimeout(() => {
            setMessages(prev => [...prev, { 
                text: 'This is a simulated response. Integrate your AI API here.', 
                sender: 'ai' 
            }]);
        }, 1000);
    };

    return (
        <div className="flex h-screen bg-[#101214]">
            <ChattingSidebar pageConfig={currentConfig} />
            
            <div className="flex-1 flex flex-col">
                {/* Main Chat Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    {messages.length === 0 ? (
                        // Welcome Screen
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center max-w-2xl">
                                {currentConfig?.icon && (
                                <div 
                                    ref={avatarRef}
                                    className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    {currentConfig?.icon}
                                </div>
                                )}
                                
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
                                    <button 
                                        onClick={() => handleSendMessage(currentConfig?.title === 'AI Tutor' ? 'Explain quantum computing' : 'Quick start')}
                                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                                    >
                                        {currentConfig?.title === 'AI Tutor' ? 'Explain quantum computing' : 'Quick start'}
                                    </button>
                                    <button 
                                        onClick={() => handleSendMessage(currentConfig?.title === 'AI Tutor' ? 'Why does gravity work?' : 'See examples')}
                                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                                    >
                                        {currentConfig?.title === 'AI Tutor' ? 'Why does gravity work?' : 'See examples'}
                                    </button>
                                    <button 
                                        onClick={() => handleSendMessage(currentConfig?.title === 'AI Tutor' ? 'Teach calculus' : 'Learn more')}
                                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                                    >
                                        {currentConfig?.title === 'AI Tutor' ? 'Teach calculus' : 'Learn more'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Messages Display
                        <div className="max-w-4xl mx-auto space-y-4">
                            {messages.map((msg, idx) => (
                                <div 
                                    key={idx} 
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div 
                                        className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                                            msg.sender === 'user' 
                                                ? 'bg-emerald-500 text-white' 
                                                : 'bg-gray-800 text-gray-200'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Prompt Sender at Bottom */}
                <div className='flex justify-center items-center'>
                    <PromptSender 
                        pageConfig={currentConfig} 
                        onSendMessage={handleSendMessage}
                    />
                </div>
            </div>
        </div>
    );
};