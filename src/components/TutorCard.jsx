import React, { useEffect, useRef } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

function TutorCard({ tutor, isLive, index }) {
    const cardRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        gsap.fromTo(
            cardRef.current,
            {
                x: -200,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power3.out'
            }
        );
    }, [index]);

    const handleClick = () => {
        if (!isLive) {
            gsap.to(cardRef.current, {
                x: -200,
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    navigate('/select-tutor/ai-tutor');
                }
            });
        }
    };

    if (isLive) {
        return (
            <div 
                ref={cardRef}
                className="relative w-full rounded-2xl p-[2px] bg-gradient-to-r from-green-600/50 via-green-500/70 to-green-600/50 hover:from-green-500/70 hover:via-green-400/90 hover:to-green-500/70 transition-all cursor-pointer"
            >
                <span className="absolute -top-2 -right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full z-10">
                    Coming Soon
                </span>
                <div className="w-full bg-gradient-to-r from-green-900/20 to-green-800/20 rounded-2xl p-5 flex items-center gap-4">
                    <img
                        src={tutor.image}
                        alt={tutor.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
                    />
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white text-base font-semibold">
                                {tutor.title}
                            </h3>
                            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                LIVE
                            </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">
                            {tutor.description}
                        </p>
                        <div className="flex items-center gap-2 text-yellow-400 text-xs">
                            <Sparkles className="w-4 h-4" />
                            <span>Instant response</span>
                        </div>
                    </div>
                    <button className="bg-green-500/40 text-gray-400 font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 cursor-not-allowed">
                        Join Now
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div 
            ref={cardRef}
            onClick={handleClick}
            className="w-full rounded-2xl p-[2px] bg-gradient-to-r from-[#005e3428] via-[#007a4357] to-[#005e3428] border border-[#13583bda] hover:border-[#920c0c] transition-all duration-300 cursor-pointer"
        >
            <div className="w-full bg-[#005e3418] rounded-2xl p-5 flex items-center gap-4">
                <div className="relative">
                    <img
                        src={tutor.image}
                        alt={tutor.name}
                        className="w-14 h-14 rounded-full object-cover"
                    />
                    {tutor.badge && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <h3 className="text-white text-base font-semibold mb-1">
                        {tutor.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                        {tutor.name}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        {tutor.subjects.map((subject, idx) => (
                            <span
                                key={idx}
                                className="text-gray-300 text-xs px-3 py-1 bg-gray-800/80 rounded-full border border-gray-700"
                            >
                                {subject}
                            </span>
                        ))}
                    </div>
                </div>
                <ChevronRight className="text-gray-500 w-7 h-7 flex-shrink-0 mb-10 bg-[#00000077] rounded-full p-1" />
            </div>
        </div>
    );
}

export default TutorCard;