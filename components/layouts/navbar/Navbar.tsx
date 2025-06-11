"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import Image from "next/image";

const Navbar = () => {
  const pathName = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Learning Companions", href: "/companions" },
    { name: "My Journey", href: "/my-journey" },
  ];

  return (
    <nav className="flex justify-between items-center bg-white h-[90px] mx-auto px-6 py-2 max-sm:px-3">
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
        <div className="flex justify-center items-center gap-9">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`text-[18px] font-semibold  ${
                pathName === item.href
                  ? "text-red-500"
                  : "text-neutral-900 hover:text-red-500"
              } transition-all duration-150 max-sm:text-xs`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Link href={"/"}>Sign-In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
