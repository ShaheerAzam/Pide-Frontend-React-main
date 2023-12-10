import { FaHome, FaUser, FaCog, FaSignOutAlt, FaCloudUploadAlt,FaPhoneAlt   } from 'react-icons/fa'; // Import icons
import { Link } from 'react-router-dom';

import React, { useState} from 'react';
function Sidebar({ setMainContent }) {
  // Define your color scheme here
  const sidebarColor = 'bg-blue-500'; // Adjust based on your theme
      
  const [displayedContent, setDisplayedContent] = useState(null);

  const handleProfileClick = () => {
    // Replace this with logic to fetch and display user details
    const userDetails = {
      name: 'John Doe',
      email: 'john@example.com',
      // ...other user details
    };
    setDisplayedContent(userDetails);
  };

  const resetDisplayedContent = () => {
    setDisplayedContent(null);
  };

  const handleOptionClick = (option) => {
    setMainContent(option); // Set the main content based on the selected option
  };
  return (
    <aside className={`w-64 h-screen ${sidebarColor}`}>
      {/* Sidebar content */}
      <ul className="mt-10">
        <li className="flex items-center px-6 py-4 text-white hover:bg-blue-600"
                  onClick={() => handleOptionClick('Home')}
>

          <FaHome className="w-6 h-6 mr-2" />
                      Home
        </li>
      
        <li className="flex items-center px-6 py-4 text-white hover:bg-blue-600"
                  onClick={() => handleOptionClick('SECP Registration')}>
          
          <FaCloudUploadAlt className="w-6 h-6 mr-2" />
          SECP Registration
              </li>
        <li className="flex items-center px-6 py-4 text-white hover:bg-blue-600"
                  onClick={() => handleOptionClick('FBR Registration')}>



          <FaCloudUploadAlt className="w-6 h-6 mr-2" />
          FBR Registration
              </li>
        <li className="flex items-center px-6 py-4 text-white hover:bg-blue-600"
                  onClick={() => handleOptionClick('Bank Account Documents')}
>
          <FaCloudUploadAlt className="w-6 h-6 mr-2" />
          Bank Account Documents 

              </li>
        <li className="flex items-center px-6 py-4 text-white hover:bg-blue-600"
                  onClick={() => handleOptionClick('PSEB Registration')}
>
          <FaCloudUploadAlt className="w-6 h-6 mr-2" />
          PSEB Registration

        </li>
        <li className="flex items-center px-6 py-4 text-white hover:bg-blue-600"
                  onClick={() => handleOptionClick('Settings')}
>
          <FaPhoneAlt FaSignOutAlt className="w-6 h-6 mr-2" />
          Contact Us
        </li>
          </ul>
          {displayedContent && (
        <div className="absolute top-0 bottom-0 right-0 p-8 bg-white left-64">
          {/* Display user details */}
          <h2>User Details</h2>
          <p>Name: {displayedContent.name}</p>
          <p>Email: {displayedContent.email}</p>
          {/* Add more user details */}
          <button onClick={resetDisplayedContent}>Close</button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
