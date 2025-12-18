import React, { useState } from 'react';
import { Search } from 'lucide-react';
import pythonImg from "../assets/PY.png"

const LanguageSelector = ({ onLanguageChange, defaultLanguage = 'Python' }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [searchQuery, setSearchQuery] = useState('');
  console.log(defaultLanguage,"defaultLanguage")
  console.log(onLanguageChange,"onLanguageChange")

  // Import your language images here
  const languages = [
    { name: 'TypeScript', color: 'bg-blue-500', image: '/path/to/typescript.png' },
    { name: 'JavaScript', color: 'bg-yellow-400', image: '/path/to/javascript.png' },
    { name: 'Python', color: 'bg-blue-400', image: (pythonImg) },
    { name: 'Java', color: 'bg-red-500', image: '/path/to/java.png' },
    { name: 'C#', color: 'bg-purple-500', image: '/path/to/csharp.png' },
    { name: 'C++', color: 'bg-blue-600', image: '/path/to/cpp.png' },
    { name: 'C', color: 'bg-blue-500', image: '/path/to/c.png' },
    { name: 'Go', color: 'bg-cyan-400', image: '/path/to/go.png' },
    { name: 'Rust', color: 'bg-orange-500', image: '/path/to/rust.png' }
  ];

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageSelect = (langName) => {
    setSelectedLanguage(langName);
    if (onLanguageChange) {
      onLanguageChange(langName);
    }
  };

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search languages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#131316] text-gray-300 pl-9 pr-4 py-2.5 rounded-lg text-sm placeholder-gray-500 border border-gray-700/50 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
        />
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {filteredLanguages.map((lang) => (
          <button
            key={lang.name}
            onClick={() => handleLanguageSelect(lang.name)}
            className={`flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-all hover:scale-105 border ${
              selectedLanguage === lang.name
                ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/30'
                : 'bg-[#131316] border-gray-700/50 hover:bg-gray-800/50 hover:border-emerald-500/30'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 overflow-hidden `}
            >
              <img 
                src={lang.image} 
                alt={lang.name}
                className="w-7 h-7 object-contain"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span class="text-white font-bold text-xs">${lang.name.slice(0, 2)}</span>`;
                }}
              />
            </div>
            <span className={`text-[10px] text-center leading-tight font-medium ${
              selectedLanguage === lang.name ? 'text-emerald-400' : 'text-gray-400'
            }`}>
              {lang.name}
            </span>
          </button>
        ))}
      </div>

      {filteredLanguages.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          No languages found
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;