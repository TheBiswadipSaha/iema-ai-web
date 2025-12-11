import React from 'react'

function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} My App. All rights reserved.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a
                            href="#"
                            onClick={(e) => handleNavigation(e, '#')}
                            className="text-sm hover:text-gray-300 transition"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            onClick={(e) => handleNavigation(e, '#')}
                            className="text-sm hover:text-gray-300 transition"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            onClick={(e) => handleNavigation(e, '#')}
                            className="text-sm hover:text-gray-300 transition"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer