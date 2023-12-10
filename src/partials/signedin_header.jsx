import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Signedin_Header({ userData }) {
  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const username = userData.name; // Hardcoded username

  const handleSignout = () => {
    window.localStorage.clear();
    window.location.href = "./SignIn";
  };

  const signoutButton = (
    <button
      className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
      type="button"
      onClick={handleSignout}
    >
      Sign Out
    </button>
  );

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            <div className="w-8 h-8">SoftwareEase</div>
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <svg
                className="w-8 h-8"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    cx="21.152%"
                    cy="86.063%"
                    fx="21.152%"
                    fy="86.063%"
                    r="79.941%"
                    id="header-logo"
                  >
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect
                  width="32"
                  height="32"
                  rx="16"
                  fill="url(#header-logo)"
                  fillRule="nonzero"
                />
              </svg>
            </Link>
          </div>
          {/* Site navigation */}
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <div className="flex items-center">
                  {/* Display hardcoded username */}
                  <span className="font-semibold text-gray-900">
                    Welcome, {username}
                  </span>
                  {/* Unconditional signout button */}
                  {signoutButton}
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Signedin_Header;
