"use client";
import ProductCarousel from "@/components/home/ProductCarousel";
import NavBar from "@/components/navbar";
import { useGetPopularProductCatalogQuery, useGetProductsByCategoroy } from "@/hooks/useProductMutation";

export default function Home() {
  const { data: buildingData } = useGetProductsByCategoroy("Building");
  const { data: animalData } = useGetProductsByCategoroy("Animals");
  const { data: popularItems } = useGetPopularProductCatalogQuery(1, 20);
  return (
    <>
      <NavBar />
      <ProductCarousel title="Popular Products" productsToShow={popularItems?.products} className="mt-5" amountToShow={5} />
      <ProductCarousel title="Animal" productsToShow={animalData?.products} className="mt-5" amountToShow={5} />
      <ProductCarousel title="Building" productsToShow={buildingData?.products} className="mt-5" amountToShow={5} />
    </>
  );
}
