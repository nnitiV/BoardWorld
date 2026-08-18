"use client";
import Overview from "@/components/admin/Overview";

export default function Admin() {
  // const [selectedMenu, setSelectedMenu] = useState<"OVERVIEW" | "ADD">(
  //   "OVERVIEW",
  // );
  return (
    <div className="w-full h-full min-h-screen pb-12">
        {/* {selectedMenu == "OVERVIEW" && <Overview />} */}
        <Overview />
    </div>
  );
}
