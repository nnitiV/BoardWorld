"use client";
import Overview from "@/components/admin/Overview";

export default function Admin() {
  // const [selectedMenu, setSelectedMenu] = useState<"OVERVIEW" | "ADD">(
  //   "OVERVIEW",
  // );
  return (
    <div className="shadow rounded flex gap-4">
      <div className="pt-4 w-full">
        {/* {selectedMenu == "OVERVIEW" && <Overview />} */}
        <Overview />
      </div>
    </div>
  );
}
