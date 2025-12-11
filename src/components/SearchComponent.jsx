import { Search, SendHorizontal } from 'lucide-react';

export default function SearchComponent() {
  return (
      <div >
        {/* Search input container */}
        <div className="relative flex items-center px-2 bg-gray-900/50 backdrop-blur-sm border-2 border-[#00984C80] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 1px #00984C80, 0 0 15px #00984C80' }}>
          {/* Search icon */}
          <div className="pl-6 pr-3">
            <Search className="w-5 h-5 text-emerald-400" />
          </div>
          
          {/* Input field */}
          <input
            type="text"
            placeholder="Ask a question"
            className="flex-1 bg-transparent text-gray-200 placeholder-gray-500 py-4 pr-4 outline-none text-base font-semibold"
          />
          
          {/* Model selector */}
          <div className="flex items-center gap-3 pr-3">
            <select className="bg-transparent text-gray-300 text-sm outline-none cursor-pointer hover:text-emerald-400 transition-colors">
              <option value="llama-2" className="bg-gray-900">Llama - 2</option>
              <option value="llama-3" className="bg-gray-900">Llama - 3</option>
              <option value="gpt-4" className="bg-gray-900">GPT-4</option>
            </select>
            
            {/* Send button */}
            <button className="bg-[#39E48F] hover:bg-emerald-600 text-white p-2.5 rounded-lg transition-all">
              <SendHorizontal className="w-4 h-4 text-[#000] font-bold" />
            </button>
          </div>
        </div>
      </div>
    
  );
}