import React, { useState, useRef } from 'react';
import { Send, Paperclip, Image as ImageIcon, X, Sparkles, ChevronDown, PaperclipIcon } from 'lucide-react';

export const PromptSender = ({ pageConfig, onSendMessage, disabled }) => {
  const [prompt, setPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const imageInputRef = useRef(null);

  // Check if current page supports image upload
  const allowImageUpload = pageConfig?.allowImageUpload;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      console.log("image uploaded", file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleSend = () => {
    if (prompt.trim() || uploadedImage) {
      onSendMessage(prompt, uploadedImage);
      setPrompt("");
      setUploadedImage(null);
      setImagePreview(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="w-full max-w-4xl bg-[#1a1b1e] border border-gray-800 rounded-2xl shadow-lg">
      <div className="px-4 py-4">
        {/* Action Buttons */}
        {pageConfig?.actions && pageConfig.actions.length > 0 && (
          <div className="flex gap-3 mb-4">
            {pageConfig.actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => onSendMessage(action.toLowerCase())}
                disabled={disabled}
                className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-gray-800/50 text-gray-400 hover:text-gray-200 rounded-lg text-sm border border-gray-700/50 hover:border-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {action}
              </button>
            ))}
          </div>
        )}

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4 relative inline-block">
            <img 
              src={imagePreview} 
              alt="Upload preview" 
              className="max-h-32 rounded-lg border border-gray-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
            >
              ×
            </button>
          </div>
        )}

        {/* Main Input Container */}
        <div className="flex items-center gap-3 bg-gray-900/50 rounded-lg px-3 py-2 border border-gray-800 focus-within:border-emerald-500 transition-colors">
          {/* Image Upload Icon - Only for vision type */}
          {allowImageUpload && (
            <label className="cursor-pointer text-gray-400 hover:text-emerald-400 transition-colors">
              <input 
                ref={imageInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
              />
              <PaperclipIcon size={20} />
            </label>
          )}

          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={pageConfig?.placeholder || "Message Wesley..."}
              className="w-full bg-transparent text-gray-200 placeholder:text-gray-500 px-2 py-2 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={disabled}
            />
          </div>

          {/* Send Button */}
          <button 
            onClick={handleSend}
            className="text-gray-400 hover:text-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled || (!prompt.trim() && !uploadedImage)}
          >
            <Send size={20} />
          </button>
        </div>

        {/* Disclaimer Text */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-600">
            Wesley can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
};
