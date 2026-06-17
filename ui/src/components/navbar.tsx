import Link from "next/link";

export default function NavBar() {
  return (
    <header className="bg-blue-400 p-6 items-center grid grid-cols-4">
        <h1 className="text-2xl font-bold">Board World</h1>
        <ul className="flex justify-center col-span-2">
          <li>
            <Link href={"#"}>Home</Link>
          </li>
          <li>
            <Link href={"#"}>All Products</Link>
          </li>
          <li>
            <Link href={"#"}>About</Link>
          </li>
        </ul>
        <Link href={"/login"} className="ms-auto">Log in</Link>
    </header>
  )
}
