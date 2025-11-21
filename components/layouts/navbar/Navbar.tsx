"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Learning Companions", href: "/companions" },
    { name: "My Journey", href: "/my-journey" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-md border-b border-neutral-200">
      <div className="flex justify-between items-center h-[80px] px-6 max-sm:px-4">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-center gap-2 cursor-pointer">
            {/* replace with your Image logo if needed */}
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
              NexLearn
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`relative text-base font-medium transition-colors duration-200 ${
                pathName === item.href
                  ? "text-red-600"
                  : "text-neutral-800 hover:text-red-600"
              }`}
            >
              {item.name}
              {/* underline animation */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300 ${
                  pathName === item.href ? "w-full" : "group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <button className="bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full font-medium text-sm py-2 px-5 transition-all duration-200 hover:scale-105 hover:shadow-lg">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full font-medium text-sm py-2 px-5 transition-all duration-200 hover:scale-105 hover:shadow-lg">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-lg border-t border-neutral-200 px-6 py-4 flex flex-col gap-4">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium ${
                pathName === item.href
                  ? "text-red-600"
                  : "text-neutral-800 hover:text-red-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-3">
            <SignedOut>
              <SignInButton>
                <button className="bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full font-medium text-sm py-2 px-4">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full font-medium text-sm py-2 px-4">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
