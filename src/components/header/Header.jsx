import React from "react";
import { MdOutlineMenu } from "react-icons/md";

const Header = () => {
  // let match = useMatch();
  return (
    <header className=" px-1 py-3 bg-gray-900 text-white">
      <div className=" max-w-2xl m-auto flex items-center justify-between">
        <div className="flex items-center">
          {/* Logo */}
          <svg
            className="h-8 w-8 fill-current mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 1a9 9 0 110 18 9 9 0 010-18zm0 1a8 8 0 100 16 8 8 0 000-16zm0 3a5 5 0 014.91 4H5.09A5 5 0 0110 5zm4 4a3 3 0 00-3 3h2a1 1 0 011 1v3h2v-4a3 3 0 00-3-3zm-8 0a3 3 0 00-3 3v4h2v-3a1 1 0 011-1h2a3 3 0 00-3-3z"
            />
          </svg>
          <span className="text-xl font-bold">Task app</span>
        </div>
        {/* Bouton de connexion */}
        {/* <Link to={`${match.url}/components`}> */}
        <button className=" text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <MdOutlineMenu size={30} />
        </button>
        {/* </Link> */}
      </div>
    </header>
  );
};

export default Header;
