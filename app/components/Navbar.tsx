"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Logo
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "text-indigo-600 font-medium pt-1"
                  : "text-gray-600 hover:text-indigo-500 pt-1"
              } transition-colors`}
            >
              {link.name}
            </Link>
          ))}

          <SignedIn>
            <SignOutButton>
              <Button
                size="sm"
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white hover:cursor-pointer"
              >
                Log Out
              </Button>
            </SignOutButton>
          </SignedIn>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Mobile Sidebar */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg">
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-gray-700 hover:text-indigo-500 focus:outline-none"
                  aria-label="Close menu"
                >
                  <FiX size={24} />
                </button>
              </div>
              <nav className="flex flex-col p-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`${
                      pathname === link.href
                        ? "text-indigo-600 font-medium"
                        : "text-gray-600 hover:text-indigo-500"
                    } px-4 py-2 rounded-md transition-colors`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <SignedIn>
                <SignOutButton>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white hover:cursor-pointer ml-5"
                  >
                    Log Out
                  </Button>
                </SignOutButton>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
