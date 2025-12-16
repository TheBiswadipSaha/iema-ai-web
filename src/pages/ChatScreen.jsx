import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, Image, Paperclip } from "lucide-react";
import gsap from "gsap";
import { ChattingSidebar } from "../components/ChattingSidebar";
import { PromptSender } from "../components/PromptSender";
import { PageConfigs } from "../config/pageConfigs";
import { useChatApi } from "../apis/useChatApi";
import ReactMarkdown from "react-markdown";
import { useHttp } from "../hooks/useHttp";

export const ChatScreen = () => {
  const { type, chatId } = useParams();
  const navigate = useNavigate();
  const currentConfig = PageConfigs[type];
  const { generateResponse } = useChatApi();
  const { getReq } = useHttp();

  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(chatId || null);
  const [activeFilters, setActiveFilters] = useState({});
  const [isThinking, setIsThinking] = useState(false);
  const [isLoading, setIsLoading] = useState(!!chatId); // Only load if chatId exists
  const token = sessionStorage.getItem("token");

  // Refs for animation
  const avatarRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  // Fetch conversation history from API when chatId is present
  useEffect(() => {
    const fetchConversationHistory = async () => {
      if (!chatId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getReq(`api/chat/conversations/${chatId}`, token);

        if (response?.success) {
          // Transform the API response to match your message format
          // Adjust this based on your actual API response structure
          if (response.data?.messages && Array.isArray(response.data.messages)) {
            const formattedMessages = response.data.messages.map(msg => ({
              text: msg.content || msg.text || msg.message,
              sender: msg.role === "user" || msg.sender === "user" ? "user" : "ai",
            }));
            setMessages(formattedMessages);
          }

          // Set filters if they're returned from the API
          if (response.data?.filters) {
            setActiveFilters(response.data.filters);
          }
        } else {
          console.error("Failed to fetch conversation history");
          // Optionally navigate to home or show error
          // navigate(`/chat/${type}`, { replace: true });
        }
      } catch (error) {
        console.error("Error fetching conversation:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversationHistory();
  }, [chatId]);

  // Update currentChatId when chatId param changes
  useEffect(() => {
    if (chatId) {
      setCurrentChatId(chatId);
    }
  }, [chatId]);

  // Animation effect - only run when messages are loaded and empty
  useEffect(() => {
    if (!isLoading && messages.length === 0 && avatarRef.current && titleRef.current && subtitleRef.current && buttonsRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        avatarRef.current,
        {
          x: -300,
          y: -200,
          scale: 0.5,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      )
        .fromTo(
          titleRef.current,
          {
            y: -50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          {
            y: -30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .fromTo(
          buttonsRef.current.children,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }
  }, [isLoading, messages.length]);

  // Handle sending messages
  const handleSendMessage = async (content, image = null) => {
    setMessages((prev) => [...prev, { text: content, sender: "user" }]);
    setIsThinking(true);

    const res = await generateResponse({
      content,
      type: image ? "vision" : "text",
      conversationId: currentChatId,
      image,
      filters: activeFilters,
    });

    setIsThinking(false);

    if (res?.success) {
      if (!currentChatId && res.data?.conversationId) {
        const newChatId = res.data.conversationId;
        setCurrentChatId(newChatId);
        navigate(`/chat/${type}/${newChatId}`, { replace: true });
      }

      setMessages((prev) => [...prev, { text: res.data.reply, sender: "ai" }]);
    }
  };

  // Show loading state while fetching conversation
  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#101214] items-center justify-center">
        <div className="text-gray-400 text-lg">Loading conversation...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#101214]">
      <ChattingSidebar
        pageConfig={currentConfig}
        onFilterChange={setActiveFilters}
      />

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

                <p ref={subtitleRef} className="text-gray-400 mb-8">
                  {currentConfig?.subtitle === "Physics Specialist"
                    ? "Ask me anything - from foundational principles to advanced physics and I'll break it down into simple, intuitive explanations designed to help you truly understand."
                    : `Let me help you with ${currentConfig?.subtitle?.toLowerCase()}`}
                </p>

                <div
                  ref={buttonsRef}
                  className="flex gap-3 justify-center flex-wrap"
                >
                  <button
                    onClick={() =>
                      handleSendMessage(
                        currentConfig?.title === "AI Tutor"
                          ? "Explain quantum computing"
                          : "Quick start"
                      )
                    }
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                  >
                    {currentConfig?.title === "AI Tutor"
                      ? "Explain quantum computing"
                      : "Quick start"}
                  </button>
                  <button
                    onClick={() =>
                      handleSendMessage(
                        currentConfig?.title === "AI Tutor"
                          ? "Why does gravity work?"
                          : "See examples"
                      )
                    }
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                  >
                    {currentConfig?.title === "AI Tutor"
                      ? "Why does gravity work?"
                      : "See examples"}
                  </button>
                  <button
                    onClick={() =>
                      handleSendMessage(
                        currentConfig?.title === "AI Tutor"
                          ? "Teach calculus"
                          : "Learn more"
                      )
                    }
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                  >
                    {currentConfig?.title === "AI Tutor"
                      ? "Teach calculus"
                      : "Learn more"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Messages Display
            <div className="max-w-[54.8rem] mx-auto space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] min-w-0 px-4 py-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-800 text-gray-200"
                    }`}
                  >
                    {msg.sender === "ai" ? (
                      <div className="markdown-wrap">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <span className="break-words">{msg.text}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Loading Indicator */}
          {isThinking && (
            <div className="flex justify-start max-w-[54.8rem] mx-auto">
              <div className="bg-gray-800 text-gray-300 px-4 py-3 rounded-2xl flex items-center gap-2">
                <span style={{ display: "flex", gap: "2px" }}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        animation: "blink 1.4s infinite both",
                        animationDelay: `${i * 0.2}s`,
                        fontWeight: "bold",
                      }}
                    >
                      .
                    </span>
                  ))}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Prompt Sender at Bottom */}
        <div className="flex justify-center items-center">
          <PromptSender
            pageConfig={currentConfig}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};