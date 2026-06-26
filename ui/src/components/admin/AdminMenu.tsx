interface AdminMenuProps {
  setSelectedMenu: (value: "OVERVIEW" | "ADD") => void;
}

export default function AdminMenu({setSelectedMenu}: AdminMenuProps) {
  return (
     <div className="w-60 border-e-2 border-e-blue-400 min-h-screen">
        <ul className="flex flex-col gap-1 sticky top-0 p-4">
          <li 
            className="transition-all p-2 rounded-lg font-medium text-slate-700 hover:bg-blue-400 hover:text-white cursor-pointer" 
            onClick={() => setSelectedMenu("OVERVIEW")}
          >
            Overview
          </li>
          <li 
            className="transition-all p-2 rounded-lg font-medium text-slate-700 hover:bg-blue-400 hover:text-white cursor-pointer" 
            onClick={() => setSelectedMenu("ADD")}
          >
            Add Product
          </li>
        </ul>
    </div>
  )
}
