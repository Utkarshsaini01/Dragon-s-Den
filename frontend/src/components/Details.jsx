import React, {useState, useEffect} from "react";
import DetailCard from "./DetailCard";


function Details(props){
    const [productDetail, setproductDetail] = useState([]);
    const id = props.id;
  useEffect(() => {
      getdetails();
  }, []);

  const getdetails = async () => {
    
    let result = await fetch("http://localhost:8000/details/"+id);
    result = await result.json();
    setproductDetail(result);
  };

  

  console.log("productDetail", productDetail);

    return(
        <div>
            {productDetail.map((Product, index) => {
          return (
            <DetailCard
              key={index}
              id={Product._id}
              productname = {Product.productname}
              videoURL = {Product.videoURL}
              description = {Product.description}
              equity = {Product.equity}
              price = {Product.price}
            />
          );
        })}
        </div>
    );
}

export default Details;