"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const Header = ({ toggleSidebar }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const mobileMenuRef = useRef(null);

  const isActive = (href) => pathname === href;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (e) => {
    // Prevent the event from propagating to document
    e.stopPropagation();
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);

    // Save preference to localStorage
    localStorage.setItem("darkMode", newMode);
  };

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    if (savedDarkMode) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const renderAuthLinks = (isMobile = false) => {
    if (status === 'loading') {
      return <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>;
    }

    if (session) {
      return (
        <>
          {isMobile && session.user.image && (
            <li className="flex justify-center my-4">
              <Link href="/dashboard" onClick={closeMenu}>
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/dashboard"
              className={`block py-2 px-3 rounded-md ${
                isActive("/dashboard")
                  ? "text-blue-700 dark:text-blue-500 bg-gray-100 dark:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              }`}
              onClick={isMobile ? closeMenu : undefined}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <button
              onClick={() => signOut({ callbackUrl: '/home' })}
              className={`w-full text-left block py-2 px-3 rounded-md text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-700`}
            >
              Sign Out
            </button>
          </li>
        </>
      );
    }

    return (
      <>
        <li>
          <Link
            href="/signup"
            className={`block py-2 px-3 rounded-md ${
              isActive("/signup")
                ? "text-blue-700 dark:text-blue-500 bg-gray-100 dark:bg-gray-700"
                : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            }`}
            onClick={isMobile ? closeMenu : undefined}
          >
            Sign Up
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className={`block py-2 px-3 rounded-md ${
              isActive("/login")
                ? "text-blue-700 dark:text-blue-500 bg-gray-100 dark:bg-gray-700"
                : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            }`}
            onClick={isMobile ? closeMenu : undefined}
          >
            Login
          </Link>
        </li>
      </>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/home"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/images/header/profilePicture.jpeg"
                alt="Aditi Kandya"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Aditi Kandya
            </span>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <div className="w-5 h-5 relative flex items-center justify-center">
              <span
                className={`block absolute h-[2px] w-5 bg-current transform transition duration-300 ${
                  isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              ></span>
              <span
                className={`block absolute h-[2px] w-5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block absolute h-[2px] w-5 bg-current transform transition duration-300 ${
                  isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              ></span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
              <li>
                <Link
                  href="/home"
                  className={`block py-2 px-3 rounded-sm md:border-0 md:p-0 ${
                    isActive("/home")
                      ? "text-blue-700 dark:text-blue-500"
                      : "text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`block py-2 px-3 rounded-sm md:border-0 md:p-0 ${
                    isActive("/about")
                      ? "text-blue-700 dark:text-blue-500"
                      : "text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className={`block py-2 px-3 rounded-sm md:border-0 md:p-0 ${
                    isActive("/courses")
                      ? "text-blue-700 dark:text-blue-500"
                      : "text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  }`}
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/performances"
                  className={`block py-2 px-3 rounded-sm md:border-0 md:p-0 ${
                    isActive("/performances")
                      ? "text-blue-700 dark:text-blue-500"
                      : "text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  }`}
                >
                  Performances
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`block py-2 px-3 rounded-sm md:border-0 md:p-0 ${
                    isActive("/contact")
                      ? "text-blue-700 dark:text-blue-500"
                      : "text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  }`}
                >
                  Contact
                </Link>
              </li>
              {session && (
                <li>
                  <Link
                    href="/dashboard"
                    className={`block py-2 px-3 rounded-sm md:border-0 md:p-0 ${
                      isActive("/dashboard")
                        ? "text-blue-700 dark:text-blue-500"
                        : "text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li className="flex items-center">
                <div className="theme-switch">
                  <label className="block">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                    />
                    <div className="theme-switch__container w-[4.5em] h-[2em] bg-[#3D7EAE] rounded-[6.25em] overflow-hidden cursor-pointer shadow-[0_-0.062em_0.062em_rgba(0,0,0,0.25),0_0.062em_0.125em_rgba(255,255,255,0.94)] relative transition-[0.5s_cubic-bezier(0,-0.02,0.4,1.25)]">
                      <div className="absolute inset-0 z-[1] shadow-[0_0.05em_0.187em_rgba(0,0,0,0.25)_inset,0_0.05em_0.187em_rgba(0,0,0,0.25)_inset] rounded-[6.25em]"></div>
                      <div className="theme-switch__clouds w-[1em] h-[1em] bg-[#F3FDFF] rounded-[6.25em] absolute bottom-[-0.5em] left-[0.25em] shadow-[0.75em_0.25em_#F3FDFF,-0.25em_-0.25em_#AACADF,1.15em_0.3em_#F3FDFF,0.4em_-0.1em_#AACADF,1.75em_0_#F3FDFF,1em_-0.05em_#AACADF,2.35em_0.25em_#F3FDFF,1.6em_-0.25em_#AACADF,2.9em_-0.05em_#F3FDFF,2.1em_0em_#AACADF,3.6em_-0.25em_#F3FDFF,2.7em_-0.35em_#AACADF,3.7em_-1.4em_0_0.35em_#F3FDFF,3.2em_-0.5em_#AACADF,3.3em_-1.7em_0_0.35em_#AACADF] transition-[0.5s_cubic-bezier(0,-0.02,0.4,1.25)]"></div>
                      <div className="theme-switch__stars-container absolute text-white top-[-100%] left-[0.25em] w-[2.2em] h-auto transition-[0.5s_cubic-bezier(0,-0.02,0.4,1.25)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 144 55"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div
                        className={`theme-switch__circle-container w-[2.7em] h-[2.7em] bg-[rgba(255,255,255,0.1)] absolute left-[-0.35em] top-[-0.35em] rounded-[6.25em] shadow-[inset_0_0_0_2.7em_rgba(255,255,255,0.1),inset_0_0_0_2.7em_rgba(255,255,255,0.1),0_0_0_0.5em_rgba(255,255,255,0.1),0_0_0_1em_rgba(255,255,255,0.1)] flex transition-[0.3s_cubic-bezier(0,-0.02,0.35,1.17)] pointer-events-none ${
                          isDarkMode ? "left-[calc(100%-2.7em+0.35em)]" : ""
                        }`}
                      >
                        <div className="theme-switch__sun-moon-container pointer-events-auto relative z-[2] w-[1.7em] h-[1.7em] m-auto rounded-[6.25em] bg-[#ECCA2F] shadow-[0.05em_0.05em_0.05em_0em_rgba(254,255,239,0.61)_inset,0em_-0.05em_0.05em_0em_#a1872a_inset] filter drop-shadow-[0em_0.05em_0.1em_rgba(0,0,0,0.25)] overflow-hidden transition-[0.5s_cubic-bezier(0,-0.02,0.4,1.25)]">
                          <div
                            className={`theme-switch__moon w-full h-full bg-[#C4C9D1] rounded-[inherit] shadow-[0.05em_0.05em_0.05em_0em_rgba(254,255,239,0.61)_inset,0em_-0.05em_0.05em_0em_#969696_inset] transition-[0.5s_cubic-bezier(0,-0.02,0.4,1.25)] relative ${
                              isDarkMode
                                ? "translate-x-0"
                                : "translate-x-[100%]"
                            }`}
                          >
                            <div className="theme-switch__spot absolute top-[0.6em] left-[0.25em] w-[0.6em] h-[0.6em] rounded-[6.25em] bg-[#959DB1] shadow-[0em_0.025em_0.05em_rgba(0,0,0,0.25)_inset]"></div>
                            <div className="theme-switch__spot absolute top-[0.75em] left-[1.1em] w-[0.3em] h-[0.3em] rounded-[6.25em] bg-[#959DB1] shadow-[0em_0.025em_0.05em_rgba(0,0,0,0.25)_inset]"></div>
                            <div className="theme-switch__spot absolute top-[0.25em] left-[0.65em] w-[0.2em] h-[0.2em] rounded-[6.25em] bg-[#959DB1] shadow-[0em_0.025em_0.05em_rgba(0,0,0,0.25)_inset]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </li>
              {status === 'loading' ? (
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              ) : session ? (
                <>

                  {session.user.image && (
                    <li className="flex items-center ml-4">
                      <Link href="/profile">
                        <Image
                          src={session.user.image}
                          alt="Profile"
                          width={40}
                          height={40}
                          className="rounded-full cursor-pointer"
                        />
                      </Link>
                    </li>
                  )}
                   <li className="flex items-center">
                      <button onClick={() => signOut({ callbackUrl: '/home' })} className="ml-4 px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 transition">
                        Sign Out
                      </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center">
                    <Link href="/signup">
                      <button className="ml-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                        Sign Up
                      </button>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <Link href="/login">
                      <button className="ml-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                        Login
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 z-40 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/home"
              className="flex items-center space-x-3 rtl:space-x-reverse"
              onClick={closeMenu}
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="/images/header/profilePicture.jpeg"
                  alt="Aditi Kandya"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Aditi Kandya
              </span>
            </Link>
            <button
              onClick={closeMenu}
              onMouseDown={(e) => e.stopPropagation()} // Prevent event propagation
              type="button"
              className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <ul className="space-y-4">
            <li>
              <Link
                href="/home"
                className={`block py-2 px-3 rounded-md ${
                  isActive("/home")
                    ? "text-blue-700 dark:text-blue-500 bg-gray-100 dark:bg-gray-700"
                    : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 px-3 rounded-md ${
                  isActive("/about")
                    ? "text-blue-700 dark:text-blue-500 bg-gray-100 dark:bg-gray-700"
                    : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                }`}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className={`block py-2 px-3 rounded-md ${
                  isActive("/courses")
                    ? "text-blue-700 dark:text-blue-500 bg-gray-100 dark:bg-gray-700"
                    : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                }`}
                onClick={closeMenu}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                href="/performances"
                className={`block py-2 px-3 rounded-md ${
                  isActive("/performances")
                    ? "text-blue-700 dark:text-blue-500 bg-gray-100 dark:bg-gray-700"
                    : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                }`}
                onClick={closeMenu}
              >
                Performances
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`block py-2 px-3 rounded-md ${
                  isActive("/contact")
                    ? "text-blue-700 dark:text-blue-500 bg-gray-100 dark:bg-gray-700"
                    : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>
          </ul>

<div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-4">
              <div className="theme-switch w-full">
                <label className="block w-full">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                  />
                  <div className="theme-switch__container w-full h-[2em] bg-[#3D7EAE] rounded-[6.25em] overflow-hidden cursor-pointer shadow-[0_-0.062em_0.062em_rgba(0,0,0,0.25),0_0.062em_0.125em_rgba(255,255,255,0.94)] relative transition-[0.5s_cubic-bezier(0,-0.02,0.4,1.25)]">
                    <div className="absolute inset-0 z-[1] shadow-[0_0.05em_0.187em_rgba(0,0,0,0.25)_inset,0_0.05em_0.187em_rgba(0,0,0,0.25)_inset] rounded-[6.25em]"></div>
                    <div className="theme-switch__clouds w-[1em] h-[1em] bg-[#F3FDFF] rounded-[6.25em] absolute bottom-[-0.5em] left-[0.25em] shadow-[0.75em_0.25em_#F3FDFF,-0.25em_-0.25em_#AACADF,1.15em_0.3em_#F3FDFF,0.4em_-0.1em_#AACADF,1.75em_0_#F3FDFF,1em_-0.05em_#AACADF,2.35em_0.25em_#F3FDFF,1.6em_-0.25em_#AACADF,2.9em_-0.05em_#F3FDFF,2.1em_0em_#AACADF,3.6em_-0.25em_#F3FDFF,2.7em_-0.35em_#AACADF,3.7em_-1.4em_0_0.35em_#F3FDFF,3.2em_-0.5em_#AACADF,3.3em_-1.7em_0_0.35em_#AACADF] transition-[0.5s_cubic-bezier(0,-0.02,0.4,1.25)]"></div>
                    <div className="theme-switch__stars-container absolute text-white top-[-100%] left-[0.25em] w-[2.2em] h-auto transition-[0.5s_cubic-bezier(0,-0.02,0.4,1.25)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 144 55"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div
                        className={`theme-switch__circle-container w-[2.7em] h-[2.7em] bg-[rgba(255,255,255,0.1)] absolute left-[-0.35em] top-[-0.35em] rounded-[6.25em] shadow-[inset_0_0_0_2.7em_rgba(255,255,255,0.1),inset_0_0_0_2.7em_rgba(255,255,255,0.1),0_0_0_0.5em_rgba(255,255,255,0.1),0_0_0_1em_rgba(255,255,255,0.1)] flex transition-[0.3s_cubic-bezier(0,-0.02,0.35,1.17)] pointer-events-none ${
                          isDarkMode ? "left-[calc(100%-2.7em+0.35em)]" : ""
                        }`}
                      >
                        <div className="theme-switch__sun-moon-container pointer-events-auto relative z-[2] w-[1.7em] h-[1.7em] m-auto rounded-[6.25em] bg-[#ECCA2F] shadow-[0.05em_0.05em_0.05em_0em_rgba(254,255,239,0.61)_inset,0em_-0.05em_0.05em_0em_#a1872a_inset] filter drop-shadow-[0em_0.05em_0.1em_rgba(0,0,0,0.25)] overflow-hidden transition-[0.5s_cubic-bezier(0,-0.02,0.4,1.25)]">
                          <div
                            className={`theme-switch__moon w-full h-full bg-[#C4C9D1] rounded-[inherit] shadow-[0.05em_0.05em_0.05em_0em_rgba(254,255,239,0.61)_inset,0em_-0.05em_0.05em_0em_#969696_inset] transition-[0.5s_cubic-bezier(0,-0.02,0.4,1.25)] relative ${
                              isDarkMode
                                ? "translate-x-0"
                                : "translate-x-[100%]"
                            }`}
                          >
                            <div className="theme-switch__spot absolute top-[0.6em] left-[0.25em] w-[0.6em] h-[0.6em] rounded-[6.25em] bg-[#959DB1] shadow-[0em_0.025em_0.05em_rgba(0,0,0,0.25)_inset]"></div>
                            <div className="theme-switch__spot absolute top-[0.75em] left-[1.1em] w-[0.3em] h-[0.3em] rounded-[6.25em] bg-[#959DB1] shadow-[0em_0.025em_0.05em_rgba(0,0,0,0.25)_inset]"></div>
                            <div className="theme-switch__spot absolute top-[0.25em] left-[0.65em] w-[0.2em] h-[0.2em] rounded-[6.25em] bg-[#959DB1] shadow-[0em_0.025em_0.05em_rgba(0,0,0,0.25)_inset]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              {renderAuthLinks(true)}
            </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </>
  );
};

export default Header;

