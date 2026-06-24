"use client";
import AddProduct from "@/components/admin/AddProduct";
import AdminMenu from "@/components/admin/AdminMenu";
import Overview from "@/components/admin/Overview";
import { useState } from "react";

export default function Admin() {
  const [selectedMenu, setSelectedMenu] = useState<"OVERVIEW" | "ADD">(
    "OVERVIEW",
  );
  return (
    <div className="shadow rounded flex gap-4">
      <AdminMenu setSelectedMenu={setSelectedMenu} />
      <div className="pt-4 w-full">
        {selectedMenu == "OVERVIEW" ? <Overview /> : <AddProduct />}
      </div>
    </div>
  );
}
