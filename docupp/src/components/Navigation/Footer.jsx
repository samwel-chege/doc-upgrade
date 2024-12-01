import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-3 text-white py-4">
      <div className="text-center">
        <p>© 2024 DocUpp. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#facebook" className="hover:underline">
            Facebook
          </a>
          <a href="#twitter" className="hover:underline">
            Twitter
          </a>
          <a href="#linkedin" className="hover:underline">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
