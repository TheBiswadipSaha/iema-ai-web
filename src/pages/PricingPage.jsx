import React from "react";
import { Check, Gift, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "Free",
    credits: "50 Credits Free",
    icon: Gift,
    theme: "gray",
    features: [
      "Access basic AI models",
      "Standard generation speed",
      "Community support",
    ],
    buttonText: "Current Plan",
    disabled: true,
  },
  {
    name: "Starter",
    price: "₹50",
    amount: 50,
    credits: "50 Credits Included",
    icon: Sparkles,
    theme: "purple",
    features: [
      "Everything in Free +",
      "Access all AI models",
      "Priority generation speed",
      "Credits never expire",
      "Premium support",
    ],
    buttonText: "Buy Now",
  },
  {
    name: "Pro",
    price: "₹100",
    amount: 100,
    credits: "100 Credits Included",
    icon: Zap,
    theme: "green",
    popular: true,
    features: [
      "Everything in Free +",
      "Access all AI models",
      "Priority generation speed",
      "Credits never expire",
      "Premium support",
    ],
    buttonText: "Buy Now",
  },
];

const themeStyles = {
  gray: {
    card: "bg-zinc-900 border-white/10 text-white",
    badge: "bg-zinc-700 border border-zinc-600 text-zinc-400",
    button: "bg-zinc-700 text-zinc-400 cursor-not-allowed",
    check: "text-zinc-500",
  },
  purple: {
    card:
      "bg-gradient-to-br from-[#1b142f] to-[#0f0b1e] border-purple-500/40 hover:shadow-purple-500/30",
    badge: "bg-purple-500/20 text-purple-300 border border-purple-500/40",
    button:
      "bg-purple-500 hover:bg-purple-600 active:scale-95 text-white",
    check: "text-purple-400",
    price: "text-purple-400",
  },
  green: {
    card:
      "bg-gradient-to-br from-[#06291b] to-[#03160f] border-emerald-500/50 hover:shadow-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",
    button:
      "bg-emerald-400 hover:bg-emerald-500 active:scale-95 text-black",
    check: "text-emerald-400",
    price: "text-emerald-400",
  },
};

const PricingPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white px-4 py-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">
          Build, Create, and Scale with{" "}
          <span className="text-emerald-400">IEMA AI</span>
        </h1>
        <p className="mt-4 text-gray-400">
          Choose a plan that fits your needs and unlock credits to power every AI
          feature.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => {
          const style = themeStyles[plan.theme];
          const Icon = plan.icon;

          return (
            <div
              key={i}
              className={`relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${style.card}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400 text-black animate-pulse">
                  POPULAR
                </span>
              )}

              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold">{plan.name}</h2>
              </div>

              {/* Price */}
              <div className="mt-2">
                <span
                  className={`text-4xl font-bold ${
                    style.price || "text-white"
                  }`}
                >
                  {plan.price}
                </span>
              </div>

              {/* Credits badge */}
              <div
                className={`mt-2 inline-block px-4 py-1.5 rounded-full text-sm ${style.badge}`}
              >
                {plan.credits}
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-3 text-sm text-gray-300">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className={`w-4 h-4 ${style.check}`} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                disabled={plan.disabled}
                onClick={() => navigate('/login')}
                className={`mt-8 w-full rounded-xl py-3 font-semibold transition-transform duration-200 cursor-pointer ${
                  style.button
                } ${!plan.disabled && "hover:scale-[1.02]"}`}
              >
                {plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="mt-14 text-center text-sm text-gray-500">
        ₹50 = 50 credits • ₹100 = 100 credits • No subscriptions • Credits never
        expire
      </p>
    </div>
  );
};

export default PricingPage;
