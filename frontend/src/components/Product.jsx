import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = async () => {
    let result = await fetch("http://localhost:8000/products");
    result = await result.json();
    setProducts(result);
  };

  console.log("products", products);

  return (
    <div className="container">
      <div className="row">
        {products.map((Product, index) => {
          return (
            <ProductCard
              key={index}
              id={Product._id}
              img={Product.img}
              productname={Product.productname}
              name={Product.name}
              equity={Product.equity}
              price={Product.price}
            />
          );
        })}
      </div>
      <div className="timepass">
      </div>
    </div>
  );
}

export default Product;
