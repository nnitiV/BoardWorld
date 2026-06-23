import NavBar from "@/components/navbar";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar /> 
      <main>{children}</main>
    </>
  );
}