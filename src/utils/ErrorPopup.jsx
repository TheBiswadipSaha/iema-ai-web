// src/utils/ErrorPopup.jsx
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

const ErrorPopup = ({ takeData, setPopupShow, variant = "error" }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [setPopupShow]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setPopupShow(false);
    }, 300);
  };

  // Theme configuration based on variant
  const variantConfig = {
    success: {
      bgColor: "bg-emerald-600",
      icon: <CheckCircle size={20} className="text-white" />,
      progressBar: "bg-emerald-400"
    },
    error: {
      bgColor: "bg-red-600",
      icon: <XCircle size={20} className="text-white" />,
      progressBar: "bg-red-400"
    },
    warning: {
      bgColor: "bg-yellow-600",
      icon: <AlertCircle size={20} className="text-white" />,
      progressBar: "bg-yellow-400"
    },
    info: {
      bgColor: "bg-blue-600",
      icon: <Info size={20} className="text-white" />,
      progressBar: "bg-blue-400"
    }
  };

  const config = variantConfig[variant] || variantConfig.error;

  return (
    <div 
      className={`fixed top-4 right-4 z-[9999] transition-all duration-300 ${
        isExiting 
          ? "opacity-0 translate-y-2" 
          : "opacity-100 translate-y-0"
      }`}
      style={{
        animation: isExiting ? "none" : "slideDown 0.3s ease-out"
      }}
    >
      <div 
        className={`${config.bgColor} text-white rounded-lg overflow-hidden min-w-[320px] max-w-[400px]`}
      >
        {/* Main Content */}
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Icon */}
          <div className="flex-shrink-0">
            {config.icon}
          </div>

          {/* Message Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white leading-snug break-words">
              {takeData}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-white/70 hover:text-white transition-colors duration-150 ml-2 cursor-pointer"
            aria-label="Close notification"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-black/20 overflow-hidden">
          <div 
            className={`h-full ${config.progressBar}`}
            style={{
              animation: "progressShrink 5s linear forwards"
            }}
          />
        </div>
      </div>
    </div>
  );
};

// CSS animations
const styles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes progressShrink {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export { ErrorPopup };