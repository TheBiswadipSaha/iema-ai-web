import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, Image, Paperclip, Download, X, ZoomIn, Copy, Check, Flag } from "lucide-react";
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

// Code Block with Copy Button Component
const CodeBlock = ({ children, inline }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    const code = children?.props?.children || children;
    const textToCopy = typeof code === 'string' ? code : String(code);
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (inline) {
    return (
      <code className="bg-gray-700 px-1.5 py-0.5 rounded text-emerald-400 text-sm">
        {children}
      </code>
    );
  }

  return (
    <div className="relative group my-2">
      <button
        onClick={handleCopy}
        className="absolute cursor-pointer top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1 text-xs"
        title="Copy code"
      >
        {copied ? (
          <>
            <Check size={14} />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            <span>Copy</span>
          </>
        )}
      </button>
      <pre className="bg-gray-900 p-3 pr-20 rounded-lg overflow-x-auto">
        <code className="text-sm text-gray-200">
          {children}
        </code>
      </pre>
    </div>
  );
};

// Image Viewer Modal Component
const ImageViewerModal = ({ imageUrl, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-[#00000015] backdrop-blur-lg bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors cursor-pointer"
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
      a.target = "_blank";
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
          
          <div className="absolute inset-0 bg-[#0000006e] bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-lg flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => setShowModal(true)}
              className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              title="View full size"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={handleDownload}
              className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              title="Download image"
            >
              <Download size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ZoomIn size={16} />
            View
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
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

// Report Modal Component
const ReportModal = ({ onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [details, setDetails] = useState("");

  const reasons = [
    "Inaccurate or misleading information",
    "Inappropriate or offensive content",
    "Harmful or dangerous advice",
    "Privacy concerns",
    "Copyright violation",
    "Other"
  ];

  const handleSubmit = () => {
    if (selectedReason) {
      onSubmit({ reason: selectedReason, details });
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-[#00000070] bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Report Response</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-300 text-sm mb-4">
          Help us improve by reporting any issues with this AI response.
        </p>

        <div className="space-y-3 mb-4">
          {reasons.map((reason) => (
            <label
              key={reason}
              className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-650 rounded-lg cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name="reason"
                value={reason}
                checked={selectedReason === reason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-gray-200 text-sm">{reason}</span>
            </label>
          ))}
        </div>

        <textarea
          placeholder="Additional details (optional)"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full bg-gray-700 text-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
          rows="3"
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedReason}
            className="flex-1 px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader Component
const SkeletonLoader = ({ currentConfig, setActiveFilters, onSendMessage }) => {
  return (
    <div className="flex h-screen bg-[#101214]">
      <ChattingSidebar
        pageConfig={currentConfig}
        onFilterChange={setActiveFilters}
        toolName={currentConfig?.toolName}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[54.8rem] mx-auto space-y-4">
            <div className="flex justify-start">
              <div className="max-w-[70%] w-96 h-20 bg-gray-800 rounded-2xl animate-pulse"></div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[70%] w-72 h-16 bg-gray-700 rounded-2xl animate-pulse"></div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[70%] w-80 h-24 bg-gray-800 rounded-2xl animate-pulse"></div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[70%] w-64 h-14 bg-gray-700 rounded-2xl animate-pulse"></div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[70%] w-full h-32 bg-gray-800 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>

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
  const { token } = useAuth();

  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(chatId || null);
  const [activeFilters, setActiveFilters] = useState({});
  const [isThinking, setIsThinking] = useState(false);
  const [isLoading, setIsLoading] = useState(!!chatId);
  const [reportingMessageIndex, setReportingMessageIndex] = useState(null);

  // Refs for animation
  const avatarRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  // 🔥 KEY FIX: Reset state when chatId changes or becomes undefined
  useEffect(() => {
    // When navigating back to base URL (no chatId), reset everything
    if (!chatId) {
      setMessages([]);
      setCurrentChatId(null);
      setActiveFilters({});
      setIsLoading(false);
      setIsThinking(false);
    } else {
      // When chatId changes, update currentChatId and trigger loading
      setCurrentChatId(chatId);
      setIsLoading(true);
    }
  }, [chatId]);

  // Handle browser back button to navigate to home
  useEffect(() => {
    const handlePopState = () => {
      if (chatId) {
        navigate('/', { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [chatId, navigate]);

  // Fetch conversation history from API when chatId is present
  useEffect(() => {
    const fetchConversationHistory = async () => {
      // Don't fetch if there's no chatId
      if (!chatId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getReq(`api/chat/conversations/${chatId}`, token);

        if (response?.success) {
          if (response.data?.messages && Array.isArray(response.data.messages)) {
            const formattedMessages = response.data.messages.map(msg => {
              const isImageUrl = msg.sender === "bot" && 
                                typeof msg.text === "string" && 
                                (msg.text.startsWith('http://') || msg.text.startsWith('https://')) &&
                                (msg.text.includes('.png') || msg.text.includes('.jpg') || 
                                 msg.text.includes('.jpeg') || msg.text.includes('.webp') ||
                                 msg.text.includes('amazonaws.com'));

              return {
                text: msg.text || msg.content || msg.message,
                sender: msg.sender === "user" ? "user" : "ai",
                imageUrl: msg.sender === "user" ? (msg.imageUrl || null) : null,
                type: msg.type || "text",
                isGeneratedImage: isImageUrl
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
  }, [chatId, token]);

  // Animation effect - only run when messages are loaded and empty
  useEffect(() => {
    if (!isLoading && messages.length === 0 && avatarRef.current && titleRef.current && subtitleRef.current && buttonsRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        avatarRef.current,
        { x: -300, y: -200, scale: 0.5, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          titleRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          buttonsRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
          "-=0.3"
        );
    }
  }, [isLoading, messages.length]);

  // Handle sending messages
  const handleSendMessage = async (content, image = null) => {
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
      // IMAGE ANALYSIS / VISION FLOW
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
      // IMAGE GENERATION FLOW
      else if (currentConfig?.type === "image") {
        res = await generateResponse({
          content,
          type: "image",
          toolName: currentConfig?.toolName,
          conversationId: currentChatId || "",
          filters: activeFilters
        });
      }
      // TEXT FLOW
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

  // Handle report submission
  const handleReportSubmit = async (reportData) => {
    try {
      const messageToReport = messages[reportingMessageIndex];
      
      // Here you would typically send this to your backend
      console.log("Report submitted:", {
        messageIndex: reportingMessageIndex,
        messageContent: messageToReport.text,
        ...reportData,
        conversationId: currentChatId,
        timestamp: new Date().toISOString()
      });
      
      showNotification("Report submitted successfully. Thank you for your feedback.", "success");
      
      // Optionally, send to backend:
      // await postReq("api/chat/report", token, {
      //   conversationId: currentChatId,
      //   messageIndex: reportingMessageIndex,
      //   messageContent: messageToReport.text,
      //   ...reportData
      // });
      
    } catch (error) {
      console.error("Failed to submit report:", error);
      showNotification("Failed to submit report. Please try again.", "error");
    }
  };

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
        toolName={currentConfig?.toolName}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-8">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-2xl">
                <div className="flex items-center justify-center space-x-2">
                  <img src={logoImg} className='w-20 h-20 rounded-xl' alt="Logo" />
                </div>

                <h1 ref={titleRef} className="text-3xl font-bold text-white mb-2">
                  I am IEMA AI, Your {currentConfig?.title}
                </h1>

                <p ref={subtitleRef} className="text-gray-400 mb-8">
                  {currentConfig?.subtitle === "Physics Specialist"
                    ? "Ask me anything - from foundational principles to advanced physics and I'll break it down into simple, intuitive explanations designed to help you truly understand."
                    : `Let me help you with ${currentConfig?.subtitle?.toLowerCase()}`}
                </p>

                <div ref={buttonsRef} className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={() => handleSendMessage(
                      currentConfig?.title === "AI Tutor" ? "Explain quantum computing" : "Quick start"
                    )}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                  >
                    {currentConfig?.title === "AI Tutor" ? "Explain quantum computing" : "Quick start"}
                  </button>
                  <button
                    onClick={() => handleSendMessage(
                      currentConfig?.title === "AI Tutor" ? "Why does gravity work?" : "See examples"
                    )}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                  >
                    {currentConfig?.title === "AI Tutor" ? "Why does gravity work?" : "See examples"}
                  </button>
                  <button
                    onClick={() => handleSendMessage(
                      currentConfig?.title === "AI Tutor" ? "Teach calculus" : "Learn more"
                    )}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                  >
                    {currentConfig?.title === "AI Tutor" ? "Teach calculus" : "Learn more"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-[54.8rem] mx-auto space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`${msg.sender === "ai" ? "relative group" : ""} max-w-[70%]`}>
                    <div
                      className={`min-w-0 px-4 py-3 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-[#47474786] text-white"
                          : msg.isGeneratedImage
                          ? "bg-transparent p-0"
                          : "bg-gray-800 text-gray-200"
                      }`}
                    >
                      {msg.imageUrl && msg.sender === "user" && (
                        <div className="mb-2">
                          <img 
                            src={msg.imageUrl} 
                            alt="Uploaded content" 
                            className="max-w-full max-h-64 rounded-lg"
                          />
                        </div>
                      )}
                      
                      {msg.isGeneratedImage && msg.sender === "ai" ? (
                        <GeneratedImageMessage imageUrl={msg.text} />
                      ) : msg.sender === "ai" ? (
                        <div className="markdown-content prose prose-invert max-w-none">
                          <ReactMarkdown
                            components={{
                              h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-3 mt-4" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-2 mt-3" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-lg font-semibold mb-2 mt-2" {...props} />,
                              h4: ({node, ...props}) => <h4 className="text-base font-semibold mb-1 mt-2" {...props} />,
                              p: ({node, ...props}) => <p className="mb-2 leading-relaxed" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                              li: ({node, ...props}) => <li className="ml-2" {...props} />,
                              code: ({node, inline, className, children, ...props}) => (
                                <CodeBlock inline={inline}>
                                  {children}
                                </CodeBlock>
                              ),
                              pre: ({node, children, ...props}) => <>{children}</>,
                              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-emerald-500 pl-4 italic my-2" {...props} />,
                              a: ({node, ...props}) => <a className="text-emerald-400 hover:text-emerald-300 underline" {...props} />,
                              strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                              em: ({node, ...props}) => <em className="italic" {...props} />,
                              hr: ({node, ...props}) => <hr className="border-gray-600 my-4" {...props} />,
                              table: ({node, ...props}) => <table className="border-collapse border border-gray-600 my-2" {...props} />,
                              thead: ({node, ...props}) => <thead className="bg-gray-700" {...props} />,
                              tbody: ({node, ...props}) => <tbody {...props} />,
                              tr: ({node, ...props}) => <tr className="border-b border-gray-600" {...props} />,
                              td: ({node, ...props}) => <td className="border border-gray-600 px-3 py-2" {...props} />,
                              th: ({node, ...props}) => <th className="border border-gray-600 px-3 py-2 font-semibold" {...props} />,
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <span className="break-words">{msg.text}</span>
                      )}
                    </div>
                    
                    {/* Report Button - Only for AI messages */}
                    {msg.sender === "ai" && (
                      <button
                        onClick={() => setReportingMessageIndex(idx)}
                        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                        title="Report this response"
                      >
                        <Flag size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

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

        <div className="flex justify-center items-center">
          <PromptSender
            pageConfig={currentConfig}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>

      {/* Report Modal */}
      {reportingMessageIndex !== null && (
        <ReportModal
          onClose={() => setReportingMessageIndex(null)}
          onSubmit={handleReportSubmit}
        />
      )}

      <style>{`
        @keyframes blink {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};