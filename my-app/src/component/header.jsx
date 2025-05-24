// import React from "react";

// const Header = () => {
    
//     return (
//         <header>
//             <div>
//                 Home
//             </div>
//             <nav>
//                 <ul>
//                     <li>contact</li>
//                     <li>about</li>
//                 </ul>
//             </nav>
//         </header>
//     )
// }

// export default Header;
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ["Home", "About", "Services", "Contact"];

  return (
    <header className="bg-white shadow-md w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-extrabold text-blue-600 tracking-wide"
          style={{ fontFamily: "Arial, sans-serif", color: "blue" }}
        >
          EJ Tech
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              style={{
                fontFamily: "Arial, sans-serif",
                color: "black",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative text-gray-700 font-semibold group transition duration-300"
            >
              {link}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600 text-white px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block font-medium text-lg px-3 py-2 rounded hover:bg-blue-500 transition duration-200"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
