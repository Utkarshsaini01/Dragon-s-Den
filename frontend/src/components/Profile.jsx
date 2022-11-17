import React, {useState, useEffect} from "react";
import ProductCard from "./ProductCard";

function Profile(){

  const [myproducts, setmyProducts] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
      getprofile();
  }, []);

  const getprofile = async () => {
    let result = await fetch("http://localhost:8000/profile/"+userId);
    result = await result.json();
    setmyProducts(result);
  };

  

  console.log("myproducts", myproducts);

    return(
        <div className="profilediv">
            
        {myproducts.map((Product, index) => {
          return (
            <ProductCard
              key={index}
              id={index}
              img={Product.img}
              productname={Product.productname}
              name={Product.name}
              equity={Product.equity}
              price={Product.price}
            />
          );
        })}
      
      <div className="timepass">
      </div>
    
        </div>
    );
}

export default Profile;