import React, { useState } from 'react';
import { Search } from 'lucide-react';
import cImg from "../assets/C.png";
import cppImg from "../assets/C++.png";
import csharpImg from "../assets/csharpImg.png";
import goImg from "../assets/GO.png";
import javaImg from "../assets/JAVA.png";
import jsImg from "../assets/JS.png";
import pyImg from "../assets/PY.png";
import tsImg from "../assets/TS.png";

const LanguageSelector = ({ onLanguageChange, defaultLanguage = 'TypeScript' }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [searchQuery, setSearchQuery] = useState('');
  console.log(defaultLanguage,"defaultLanguage")
  // console.log(onLanguageChange,"onLanguageChange")

  // Import your language images here
  const languages = [
    { name: 'TypeScript', color: 'bg-blue-500', image: tsImg },
    { name: 'JavaScript', color: 'bg-yellow-400', image: jsImg },
    { name: 'Python', color: 'bg-blue-400', image: pyImg },
    { name: 'Java', color: 'bg-red-500', image: javaImg },
    { name: 'C#', color: 'bg-purple-500', image: csharpImg },
    { name: 'C++', color: 'bg-blue-600', image: cppImg },
    { name: 'C', color: 'bg-blue-500', image: cImg },
    { name: 'Go', color: 'bg-cyan-400', image: goImg },
    { name: 'Rust', color: 'bg-orange-500', image: csharpImg }
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

      {/* Language List */}
      <div className="flex flex-wrap gap-2.5">
        {filteredLanguages.map((lang) => (
          <button
            key={lang.name}
            onClick={() => handleLanguageSelect(lang.name)}
            className={`w-[30%] flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-all hover:scale-105 border ${
              selectedLanguage === lang.name
                ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/30'
                : 'bg-[#131316] border-gray-700/50 hover:bg-gray-800/50 hover:border-emerald-500/30'
            }`}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1 overflow-hidden">
              <img src={lang.image} alt={lang.name} className="w-7 h-7 object-contain" />
            </div>

            <span className={`text-[10px] text-center font-medium ${
              selectedLanguage === lang.name ? 'text-[#10B981]' : 'text-gray-400'
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