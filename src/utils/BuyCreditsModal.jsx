import React from "react";
import { X, Sparkles, Zap } from "lucide-react";
import { buyCredits } from "../apis/buyCredits";

const plans = [
  {
    label: "Starter",
    amount: 50,
    credits: "50 Credits",
    icon: Sparkles,
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    label: "Pro",
    amount: 100,
    credits: "100 Credits",
    icon: Zap,
    color: "bg-emerald-500 hover:bg-emerald-600",
  },
];

const BuyCreditsModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-[#0F0F11] border border-gray-800 p-6 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-white mb-2">
          Buy Credits
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Choose a plan and unlock more AI power
        </p>

        {/* Plans */}
        <div className="space-y-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.amount}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-800 bg-[#131316]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {plan.label}
                    </p>
                    <p className="text-xs text-gray-400">
                      {plan.credits}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    buyCredits(plan.amount);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold text-white transition ${plan.color}`}
                >
                  ₹{plan.amount}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BuyCreditsModal;