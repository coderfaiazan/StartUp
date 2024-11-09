import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../Redux/Slices/userSlice";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/signin");
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-white">
                CrowdFund
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white hover:bg-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold"
                    : "text-blue-200 hover:bg-blue-700 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  isActive
                    ? "text-white hover:bg-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold"
                    : "text-blue-200 hover:bg-blue-700 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                }
              >
                Explore
              </NavLink>
              <NavLink
                to="/start-project"
                className={({ isActive }) =>
                  isActive
                    ? "text-white hover:bg-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold"
                    : "text-blue-200 hover:bg-blue-700 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                }
              >
                Start a Project
              </NavLink>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoggedIn && user != null ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={toggleDropdown}
                    className="bg-blue-600 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="h-8 w-8 rounded-full text-white" />
                    <div className="text-base font-medium text-white mx-1 capitalize">
                      {user.name}
                    </div>
                    <ChevronDownIcon className="ml-1 h-5 w-5 text-white" />
                  </button>
                </div>
                {isDropdownOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Sign in
              </Link>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden bg-blue-600">
          <div className="pt-2 pb-3 space-y-1">
            <Na
              to="/"
              className="text-white hover:bg-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Home
            </Na>
            <Na
              to="/explore"
              className="text-blue-200 hover:bg-blue-700 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Explore
            </Na>
            <Na
              to="/start-project"
              className="text-blue-200 hover:bg-blue-700 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Start a Project
            </Na>
          </div>
          <div className="pt-4 pb-3 border-t border-blue-700">
            {isLoggedIn && user != null ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <UserCircleIcon className="h-10 w-fit rounded-full text-white" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-blue-200">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-base font-medium text-blue-200 hover:text-white hover:bg-blue-700"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-base font-medium text-blue-200 hover:text-white hover:bg-blue-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-blue-200 hover:text-white hover:bg-blue-700"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1">
                <Link
                  to="/signin"
                  className="block px-4 py-2 text-base font-medium text-blue-200 hover:text-white hover:bg-blue-700"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
