"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const pathName = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Learning Companions", href: "/companions" },
    { name: "My Journey", href: "/my-journey" },
  ];

  return (
    <nav className="flex justify-between items-center bg-white h-[90px] mx-auto px-6 py-2 max-sm:px-3 fixed top-0 left-0 w-full shadow-md border-b border-neutral-200">
      <Link href={"/"}>
        <div className="flex justify-center items-center p-2 overflow-hidden">
          {/* <Image
            src={"/images/logo.svg"}
            alt="logo"
            width={60}
            height={60}
            className="rounded-full max-sm:size-[40px] cursor-pointer"
          /> */}
          <p>logo</p>
        </div>
      </Link>
      <div className="flex justify-center items-center gap-9">
        {/* create a mobile-navigation-bar! */}
        <div className="flex justify-center items-center gap-9 max-sm:gap-2 max-sm:hidden">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`text-lg max-sm:text-xl font-semibold  ${
                pathName === item.href
                  ? "text-red-500"
                  : "text-neutral-900 hover:text-red-500"
              } transition-all duration-150 max-sm:text-xs`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2">
          <SignedOut>
            <SignInButton>
              <button className="bg-[#a91b1b] text-white rounded-3xl font-medium text-sm py-1 px-4 cursor-pointer max-sm:px-8 max-sm:text-xs text-center">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-[#a91b1b] text-white rounded-3xl font-medium text-sm py-1 px-4 cursor-pointer max-sm:px-8 max-sm:text-xs text-center">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
