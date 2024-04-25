"use client"
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  resto: [];
  card: [];
  shopid: number;
  Company: string;
  shoptitle: string;
}

interface ProductListProps {
  product: Product[];
}

const ProductList: React.FC<ProductListProps> = (props) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product[]>([]);

  const goTo = () => {
    router.push("/Page/product/addResto")
  };

  const deleteProducts = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/backend/restaurant/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setProduct(product.filter((product) => product.id !== id));

      } else {
        console.error("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/backend/restaurant",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Failed to fetch Products");
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div {...props}>
      <h2> Liste des Restaurants </h2>

      <table className="table">
        <thead>
          <tr>
          
            <th>Company</th>
            <th>Shop ID</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {product.map((value) => (
            <tr key={value.id}>
              <td>{value.resto.Company}</td>
              <td>{value.resto.shopid}</td>
              <td>
                <Button>
                  <GrUpdate />
                </Button>
              </td>
              <td>
                <Button onClick={() => deleteProducts(value.id)}>
                  <MdDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={goTo}>
      <IoMdAdd />Ajouter restaurant
    </Button>
    </div>

  );
};

export default ProductList;