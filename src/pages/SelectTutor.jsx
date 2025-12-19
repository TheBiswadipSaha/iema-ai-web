import React from 'react';
import TutorCard from '../components/TutorCard';

// SelectTutor Page Component
function SelectTutor() {
    const tutors = [
        {
            id: 1,
            name: "Robert Chen",
            title: "Generic All-Rounder",
            subjects: ["Mathematics", "Physics", "General Science"],
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            badge: true
        },
        {
            id: 2,
            name: "Mr. Hirai",
            title: "Physics Specialist",
            subjects: ["Quantum Mechanics", "Thermodynamics", "Electromagnetism"],
            image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop"
        },
        {
            id: 3,
            name: "Sarah Mitchell",
            title: "Chemistry Expert",
            subjects: ["Organic Chemistry", "Biochemistry", "Lab Techniques"],
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
        }
    ];

    const liveTutor = {
        id: 4,
        title: "Live Tutor",
        description: "Real-time Q&A with our expert avatar tutor",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
    };

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-3xl mx-auto py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-green-500 text-xs font-semibold tracking-wider mb-3">
                        AI-POWERED LEARNING
                    </p>
                    <h1 className="text-white text-5xl font-bold mb-4">
                        Select your <span className="text-green-500 italic">tutor</span>
                    </h1>
                    <p className="text-gray-400 text-base max-w-xl mx-auto">
                        Choose from our curated selection of AI tutors, each specialized in their field to guide your learning journey.
                    </p>
                </div>

                {/* Tutor Cards */}
                <div className="space-y-4">
                    {tutors.map((tutor, index) => (
                        <TutorCard 
                            key={tutor.id} 
                            tutor={tutor} 
                            index={index}
                        />
                    ))}
                    <TutorCard 
                        tutor={liveTutor} 
                        isLive={true} 
                        index={tutors.length}
                    />
                </div>

                {/* Footer */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 text-xs">
                        Developed by IEMA Research and Development Pvt. Ltd.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SelectTutor;