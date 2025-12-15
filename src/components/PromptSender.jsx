import React, { useState } from 'react';
import { Send, Paperclip, Mic, Sparkles } from 'lucide-react';

export const PromptSender = ({ pageConfig, onSendMessage }) => {
  const [prompt, setPrompt] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleSend = () => {
    if (prompt.trim()) {
      onSendMessage(prompt);
      setPrompt("");
    }
  };

  return (
    <div className="w-full max-w-4xl bg-[#000000] border-t border-gray-800 rounded-2xl">
      <div className="mx-auto px-4 py-4">
        {/* Action Buttons */}
        {pageConfig?.actions && pageConfig.actions.length > 0 && (
          <div className="flex gap-3 mb-4">
            {pageConfig.actions.map((action, idx) => (
              <button
                key={idx}
                className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-gray-800/50 text-gray-400 hover:text-gray-200 rounded-lg text-sm border border-gray-700/50 hover:border-gray-600 transition-all"
              >
                {idx === 0 && <Sparkles size={14} />}
                {action}
              </button>
            ))}
          </div>
        )}

        {/* Main Input Container */}
        <div className="flex items-center gap-3">
          {/* Paperclip Icon */}
          <label className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors">
            <input type="file" multiple onChange={handleFileUpload} className="hidden" />
            <Paperclip size={20} />
          </label>

          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={pageConfig?.placeholder || "Message Wesley..."}
              className="w-full bg-transparent text-gray-200 placeholder:text-gray-500 px-4 py-3 rounded-lg focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>

          {/* Microphone Icon */}
          <button className="text-gray-400 hover:text-gray-200 transition-colors">
            <Mic size={20} />
          </button>

          {/* Send Button */}
          <button 
            onClick={handleSend}
            className="text-gray-400 hover:text-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!prompt.trim()}
          >
            <Send size={20} />
          </button>
        </div>

        {/* Disclaimer Text */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-600">Nova can make mistakes. Consider checking important information.</p>
        </div>
      </div>
    </div>
  );
};