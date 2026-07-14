"use client";
import ProductCarousel from "@/components/home/ProductCarousel";
import NavBar from "@/components/navbar";
import { useGetPopularProductCatalogQuery, useGetProductsByCategoroy } from "@/hooks/useProductMutation";

export default function Home() {
  const { data: cardData } = useGetProductsByCategoroy("Card Games");
  const { data: boardData } = useGetProductsByCategoroy("Board Game");
  const { data: animalData } = useGetProductsByCategoroy("Animals");
  const { data: popularItems } = useGetPopularProductCatalogQuery(1, 20);
  return (
    <>
      <NavBar />
      <ProductCarousel title="Popular Products" productsToShow={popularItems?.products} className="mt-5" amountToShow={5} />
      <ProductCarousel title="Animal" productsToShow={animalData?.products} className="mt-5" amountToShow={5} />
      <ProductCarousel title="Board Games" productsToShow={boardData?.products} className="mt-5" amountToShow={5} />
      <ProductCarousel title="Card Games" productsToShow={cardData?.products} className="mt-5" amountToShow={5} />
    </>
  );
}
