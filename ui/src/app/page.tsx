import ProductCarousel from "@/components/home/ProductCarousel";
import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <NavBar />
      <ProductCarousel title="Popular Products" className="mt-5" amountToShow={6} />
      <ProductCarousel title="Animal" className="mt-5" amountToShow={6} />
      <ProductCarousel title="Building" className="mt-5" amountToShow={6} />
    </>
  );
}
