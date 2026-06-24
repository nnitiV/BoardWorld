import { Product } from "@/types/product.type";
import { useState } from "react";

export default function Overview() {
    const [products, setProducts] = useState<Product[]>([]);
  return (
    <div>
        <h1>Best Selling Products</h1>
        <ul>
            {products.map(product => (
                <p key={product.id}>{product.name}</p>
            ))}
        </ul>
    </div>
  )
}
