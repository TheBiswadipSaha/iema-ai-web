import React from 'react'

function Header({currentPath, navigate, user, logout}) {
  return (
    <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My App</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <a 
                  href="/" 
                  onClick={(e) => handleNavigation(e, '/')}
                  className={`hover:text-blue-200 transition ${currentPath === '/' ? 'font-bold' : ''}`}
                >
                  Home
                </a>
              </li>
              {!user ? (
                <li>
                  <a 
                    href="/login" 
                    onClick={(e) => handleNavigation(e, '/login')}
                    className={`hover:text-blue-200 transition ${currentPath === '/login' ? 'font-bold' : ''}`}
                  >
                    Login
                  </a>
                </li>
              ) : (
                <>
                  <li>
                    <a 
                      href="/dashboard" 
                      onClick={(e) => handleNavigation(e, '/dashboard')}
                      className={`hover:text-blue-200 transition ${currentPath === '/dashboard' ? 'font-bold' : ''}`}
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/profile" 
                      onClick={(e) => handleNavigation(e, '/profile')}
                      className={`hover:text-blue-200 transition ${currentPath === '/profile' ? 'font-bold' : ''}`}
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
  )
}

export default Header