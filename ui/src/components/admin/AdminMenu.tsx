interface AdminMenuProps {
  setSelectedMenu: (value: "OVERVIEW" | "ADD") => void;
}

export default function AdminMenu({setSelectedMenu}: AdminMenuProps) {
  return (
     <div className="w-60 border-e-2 border-e-blue-400">
        <ul className="flex flex-col">
          <li className="transition-all p-2 hover:bg-blue-400 hover:cursor-pointer" onClick={() => setSelectedMenu("OVERVIEW")}>
            Overview
          </li>
          <li className="transition-all p-2 hover:bg-blue-400 hover:cursor-pointer" onClick={() => setSelectedMenu("ADD")}>
            Add Product
          </li>
        </ul>
      </div>
  )
}
