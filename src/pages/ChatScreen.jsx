import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, Image, Paperclip, Download, X, ZoomIn } from "lucide-react";
import gsap from "gsap";
import { ChattingSidebar } from "../components/ChattingSidebar";
import { PromptSender } from "../components/PromptSender";
import { PageConfigs } from "../config/pageConfigs";
import { useChatApi } from "../apis/useChatApi";
import ReactMarkdown from "react-markdown";
import { useHttp } from "../hooks/useHttp";
import { useNotification } from "../context/NotificationContext";
import logoImg from '../assets/logo.png';
import { useAuth } from "../context/AuthContext";

// Image Viewer Modal Component
const ImageViewerModal = ({ imageUrl, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
      >
        <X size={32} />
      </button>
      
      <img 
        src={imageUrl} 
        alt="Generated content" 
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

// AI Generated Image Component
const GeneratedImageMessage = ({ imageUrl }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

const handleDownload = () => {
  try {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `generated-image-${Date.now()}.png`;
    a.target = "_blank"; // important fallback
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Download failed:", error);
  }
};


  return (
    <>
      <div className="bg-gray-800 text-gray-200 px-4 py-3 rounded-2xl">
        <div className="relative group">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
          )}
          
          <img 
            src={imageUrl} 
            alt="Generated content" 
            className="max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setShowModal(true)}
            onLoad={() => setIsLoading(false)}
          />
          
          {/* Overlay buttons on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-lg flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => setShowModal(true)}
              className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
              title="View full size"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={handleDownload}
              className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
              title="Download image"
            >
              <Download size={20} />
            </button>
          </div>
        </div>
        
        {/* Action buttons below image */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
          >
            <ZoomIn size={16} />
            View
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      {showModal && (
        <ImageViewerModal 
          imageUrl={imageUrl} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
};

// Skeleton Loader Component
const SkeletonLoader = ({ currentConfig, setActiveFilters, onSendMessage }) => {
  return (
    <div className="flex h-screen bg-[#101214]">
      <ChattingSidebar
        pageConfig={currentConfig}
        onFilterChange={setActiveFilters}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[54.8rem] mx-auto space-y-4">
            {/* AI Message Skeleton */}
            <div className="flex justify-start">
              <div className="max-w-[70%] w-96 h-20 bg-gray-800 rounded-2xl animate-pulse"></div>
            </div>

            {/* User Message Skeleton */}
            <div className="flex justify-end">
              <div className="max-w-[70%] w-72 h-16 bg-gray-700 rounded-2xl animate-pulse"></div>
            </div>

            {/* AI Message Skeleton */}
            <div className="flex justify-start">
              <div className="max-w-[70%] w-80 h-24 bg-gray-800 rounded-2xl animate-pulse"></div>
            </div>

            {/* User Message Skeleton */}
            <div className="flex justify-end">
              <div className="max-w-[70%] w-64 h-14 bg-gray-700 rounded-2xl animate-pulse"></div>
            </div>

            {/* AI Message Skeleton */}
            <div className="flex justify-start">
              <div className="max-w-[70%] w-full h-32 bg-gray-800 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Input Area Skeleton */}
        <div className="flex justify-center items-center">
          <PromptSender
            pageConfig={currentConfig}
            onSendMessage={onSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export const ChatScreen = () => {
  const { type, chatId } = useParams();
  const navigate = useNavigate();
  const currentConfig = PageConfigs[type];
  const { generateResponse } = useChatApi();
  const { getReq, postReq } = useHttp();
  const { showNotification } = useNotification();
  console.log("Chat Type:", type);
  console.log("Current Config:", currentConfig);

  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(chatId || null);
  const [activeFilters, setActiveFilters] = useState({});
  const [isThinking, setIsThinking] = useState(false);
  const [isLoading, setIsLoading] = useState(!!chatId);
  const { token } = useAuth();

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
        if (response.data?.messages && Array.isArray(response.data.messages)) {
          const formattedMessages = response.data.messages.map(msg => {
            // ✅ Detect if the message text is an image URL
            const isImageUrl = msg.sender === "bot" && 
                              typeof msg.text === "string" && 
                              (msg.text.startsWith('http://') || msg.text.startsWith('https://')) &&
                              (msg.text.includes('.png') || msg.text.includes('.jpg') || 
                               msg.text.includes('.jpeg') || msg.text.includes('.webp') ||
                               msg.text.includes('amazonaws.com'));

            return {
              text: msg.text || msg.content || msg.message,
              sender: msg.sender === "user" ? "user" : "ai",
              imageUrl: msg.sender === "user" ? (msg.imageUrl || null) : null, // Only for user's uploaded images
              type: msg.type || "text",
              isGeneratedImage: isImageUrl // ✅ Mark bot images
            };
          });
          setMessages(formattedMessages);
        }

        if (response.data?.filters) {
          setActiveFilters(response.data.filters);
        }
      } else {
        console.error("Failed to fetch conversation history");
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
    // ✅ Create image preview URL for immediate display
    const imagePreviewUrl = image ? URL.createObjectURL(image) : null;
    
    setMessages((prev) => [
      ...prev, 
      { 
        text: content, 
        sender: "user",
        imageUrl: imagePreviewUrl,
        type: currentConfig?.type,
      }
    ]);
    setIsThinking(true);

    let res;
    try {

      // ============================
      // 🖼 IMAGE ANALYSIS / VISION FLOW (requires actual image)
      // ============================
      if (image && currentConfig?.type === "vision") {
        const formData = new FormData();
        formData.append("content", content || "");
        formData.append("type", "vision");
        formData.append("toolName", currentConfig?.toolName);
        
        if (currentChatId) {
          formData.append("conversationId", currentChatId);
        }
        
        formData.append("image", image);

        res = await postReq(
          "api/chat/generate-image-response",
          token,
          formData,
          true
        );
      }

      // ============================
      // 🎨 IMAGE GENERATION FLOW (text-to-image)
      // ============================
      else if (currentConfig?.type === "image") {
        res = await generateResponse({
          content,
          type: "image",
          toolName: currentConfig?.toolName,
          conversationId: currentChatId || "",
          filters: activeFilters
        });
      }

      // ============================
      // 💬 TEXT FLOW
      // ============================
      else {
        res = await generateResponse({
          content,
          type: "text",
          toolName: currentConfig?.toolName,
          conversationId: currentChatId || "",
          filters: activeFilters
        });
      }

      setIsThinking(false);

      if (res?.success) {
        if (!currentChatId && res.data?.conversationId) {
          const newChatId = res.data.conversationId;
          setCurrentChatId(newChatId);
          navigate(`/chat/${type}/${newChatId}`, { replace: true });
        }
        localStorage.setItem("unknown", res.data?.token || 0);
        sessionStorage.setItem("unknown", res.data?.token || 0);

        // ✅ Check if the reply is an image URL (generated image)
        const isGeneratedImage = res.data?.type === "image" && 
                                 typeof res.data.reply === "string" && 
                                 (res.data.reply.startsWith('http') || res.data.reply.startsWith('https'));

        setMessages((prev) => [
          ...prev,
          { 
            text: res.data.reply, 
            sender: "ai",
            type: res.data?.type || "text",
            isGeneratedImage: isGeneratedImage
          }
        ]);
      }
    } catch (err) {
      console.error("Send message failed:", err);
      showNotification(err, "error");
      setIsThinking(false);
    }
  };

  // Show skeleton loader while fetching conversation
  if (isLoading) {
    return (
      <SkeletonLoader 
        currentConfig={currentConfig}
        setActiveFilters={setActiveFilters}
        onSendMessage={handleSendMessage}
      />
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
                {/* {currentConfig?.icon && (
                  <div
                    ref={avatarRef}
                    className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    {currentConfig?.icon}
                  </div>
                )} */}
                <div className="flex items-center justify-center space-x-2">
                                  <img src={logoImg} className='w-20 h-20 rounded-xl' alt="Logo" />
                                  {/* <span className="text-lg font-bold hidden sm:inline">{logo}</span> */}
                                </div>

                <h1
                  ref={titleRef}
                  className="text-3xl font-bold text-white mb-2"
                >
                  I am IEMA AI, Your {currentConfig?.title}
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
                        : msg.isGeneratedImage
                        ? "bg-transparent p-0"
                        : "bg-gray-800 text-gray-200"
                    }`}
                  >
                    {/* ✅ Display uploaded image (user side) */}
                    {msg.imageUrl && msg.sender === "user" && (
                      <div className="mb-2">
                        <img 
                          src={msg.imageUrl} 
                          alt="Uploaded content" 
                          className="max-w-full max-h-64 rounded-lg"
                        />
                      </div>
                    )}
                    
                    {/* ✅ Display AI-generated image with download */}
                    {msg.isGeneratedImage && msg.sender === "ai" ? (
                      <GeneratedImageMessage imageUrl={msg.text} />
                    ) : msg.sender === "ai" ? (
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

      {/* Add this CSS for the blink animation */}
      <style>{`
        @keyframes blink {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};