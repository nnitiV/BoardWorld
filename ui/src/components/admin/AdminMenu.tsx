import React from "react";

// 1. Export the type so the parent component can use it, avoiding magic strings.
export type AdminMenuOption = "OVERVIEW" | "ADD";

interface AdminMenuProps {
  // 2. We MUST pass the selected state down to know which menu is active
  selectedMenu: AdminMenuOption; 
  setSelectedMenu: (value: AdminMenuOption) => void;
}

export default function AdminMenu({ 
  selectedMenu, 
  setSelectedMenu 
}: AdminMenuProps) {
  
  // Helper functions to keep the JSX clean and manage dynamic styling
  const getMenuBaseClasses = "w-full text-left transition-all p-3 md:p-2 rounded-lg font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50";
  
  const getActiveClasses = (menu: AdminMenuOption) => 
    selectedMenu === menu 
      ? "bg-blue-600 text-white shadow-md" // Active state
      : "text-slate-700 hover:bg-blue-100 hover:text-blue-900"; // Inactive state

  return (
    // 3. Mobile: Full-width top navigation. Desktop: Fixed w-60 sidebar.
    <nav className="w-full md:w-60 border-b md:border-b-0 md:border-e-2 border-slate-200 md:min-h-[calc(100vh-4rem)] bg-slate-50 md:bg-transparent shrink-0">
      
      {/* 4. Mobile: Horizontal scrolling flex-row. Desktop: Vertical flex-col. */}
      <ul className="flex flex-row md:flex-col gap-2 p-2 md:p-4 overflow-x-auto md:sticky md:top-4 no-scrollbar">
        <li className="shrink-0 md:shrink w-full md:w-auto">
          {/* 5. Semantic HTML: Use <button> for clickable actions, not <li> */}
          <button 
            className={`${getMenuBaseClasses} ${getActiveClasses("OVERVIEW")}`}
            onClick={() => setSelectedMenu("OVERVIEW")}
            aria-current={selectedMenu === "OVERVIEW" ? "page" : undefined}
          >
            Overview
          </button>
        </li>
        <li className="shrink-0 md:shrink w-full md:w-auto">
          <button 
            className={`${getMenuBaseClasses} ${getActiveClasses("ADD")}`}
            onClick={() => setSelectedMenu("ADD")}
            aria-current={selectedMenu === "ADD" ? "page" : undefined}
          >
            Add Product
          </button>
        </li>
      </ul>
    </nav>
  );
}