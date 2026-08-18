"use client";
import { useLogoutMutation } from "@/hooks/useAuthMutation";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  // 1. Bug Fix: State should default to false (closed), not true!
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const accessToken = useAuthStore((state) => state.accessToken);
  const { mutate: logout } = useLogoutMutation();
  const user = useUserStore(state => state.user);
  const cart = useUserStore(state => state.cart);
  const cartItemCount = cart?.items.reduce((total, items) => total + items.quantity, 0) || 0;

  // 2. DRY Principle: Define your routes ONCE as a data array.
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/allProducts" },
    { label: "All Categories", href: "/allCategories" },
    ...(user != undefined ? [{ label: "Cart", href: "/cart" }] : [] ),
    ...(user != undefined ? [{ label: "Orders", href: "/orders" }] : [] ),
    ...(user?.role === "ADMIN" ? [{ label: "Admin", href: "/admin" }] : []),
    { label: "About", href: "/about" },
  ];

  // Helper to ensure we strictly close the menu (rather than toggling it) when a link is clicked
  const handleCloseMenu = () => setIsOpen(false);

  // 3. Centralize the auth logic so mobile and desktop behave identically
  const renderAuthLink = (isMobile: boolean) => {
    if (accessToken) {
      return (
        <button
          onClick={() => {
            logout();
            if (isMobile) handleCloseMenu();
          }}
          className="text-left font-medium transition-colors hover:text-blue-300 w-full"
        >
          Logout
        </button>
      );
    }
    return (
      <Link 
        href="/login" 
        onClick={isMobile ? handleCloseMenu : undefined}
        className="font-medium transition-colors hover:text-blue-300"
      >
        Log in
      </Link>
    );
  };

  return (
    <>
      {/* 4. Added sticky positioning and z-index to the header so it stays on top while scrolling */}
      <header className="bg-blue-950 text-slate-100 shadow-md border-b border-slate-900 py-4 px-4 md:px-6 sticky top-0 z-40">
        {/* Swapped grid for flex. Grid-cols-2 can cause weird centering issues with navigations. */}
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold transition-transform hover:scale-105"
          >
            Board World
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`font-medium transition-colors hover:text-blue-300 ${link.label === "Cart" && "relative"}` }
                  >
                    {link.label}
                    {link.label === "Cart" && cartItemCount > 0 && (
                      <span className="bg-red-500 rounded-full py-1 px-2 text-xs font-bold absolute -top-3 -right-5">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li>{renderAuthLink(false)}</li>
            </ul>
          </nav>

          {/* Mobile Hamburger Button - Wrapped in a semantic <button> */}
          <button
            className="md:hidden p-2 -mr-2 text-slate-100 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg"
            onClick={() => setIsOpen(true)}
            aria-label="Open main menu"
            aria-expanded={isOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* 5. Fixed Mobile Overlay positioning (inset-0) and z-index (z-50) */}
      <div
        className={clsx(
          "fixed inset-0 z-50 transition-opacity duration-300 md:hidden",
          !isOpen ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        {/* Separate backdrop div allows the user to click the dark area to close the menu */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleCloseMenu}
          aria-hidden="true"
        />

        <nav
          className={clsx(
            "absolute top-0 right-0 h-full w-64 bg-slate-950 text-slate-100 p-6 shadow-2xl transition-transform duration-300 ease-in-out",
            !isOpen ? "translate-x-full" : "translate-x-0",
          )}
        >
          <button
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg"
            onClick={handleCloseMenu}
            aria-label="Close main menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* 6. Dynamic Mapping ensures mobile and desktop ALWAYS match */}
          <ul className="mt-12 flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={handleCloseMenu}
                  className={`block text-lg font-medium transition-colors hover:text-blue-300 ${link.label === "Cart" && "relative"}`}
                >
                  {link.label}
                  {link.label === "Cart" && cartItemCount > 0 && (
                      <span className="bg-red-500 rounded-full py-1 px-2 text-xs font-bold absolute transform translate-x-1/2 -translate-y-1/2">
                        {cartItemCount}
                      </span>
                    )}
                </Link>
              </li>
            ))}
            <li className="pt-6 border-t border-slate-800 text-lg">
              {renderAuthLink(true)}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}