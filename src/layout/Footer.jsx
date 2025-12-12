import React from 'react'
import logoImage from '../assets/logo.png';

function Footer() {
    return (
        <footer className=" text-white relative">
            {/* Gradient border at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            
            <div className="container mx-auto px-4 py-8">
                {/* First Row - Logo and branding */}
                <div className="flex  space-x-3 pb-6">
                    <img 
                        src={logoImage} 
                        alt="IEMA.AI Logo" 
                        className="w-10 h-10 rounded-lg"
                    />
                    <div className="flex flex-col ">
                        <h3 className="text-lg font-semibold">IEMA.AI</h3>
                        <p className="text-xs text-gray-400">Powered by IEM-UEM Group</p>
                    </div>
                </div>

                {/* Separator line */}
                {/* <div className="border-t border-gray-700 mb-6"></div> */}

                {/* Second Row - Copyright and developed by */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 space-y-2 md:space-y-0">
                    <p>© {new Date().getFullYear()} IEMA.AI. All rights reserved.</p>
                    <p className="flex items-center">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                        Developed by IEMA Research and Development
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer