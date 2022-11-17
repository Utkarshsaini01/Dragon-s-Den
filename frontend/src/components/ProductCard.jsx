import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {

  const blob = new Blob([Int8Array.from(props.img.data.data)], {type: props.img.contentType });

  const image = window.URL.createObjectURL(blob);
  const id = props.id;

  return (
    <div className="column">
    <div className="pcard">
      <div className="pimg"> 
         <img className="pimage" src={image} alt="product image" />
      </div>

      <div className="pheading">
        <p>{props.productname}</p>
      </div>
      <div className="pinfo">
        <p>
          Entrepreneur: {props.name} <br /> Equity: {props.equity} <br />
          Valuation: {props.price}
        </p>
      </div>
      <button className="pview"><Link to={`/details/${props.id}`} params={{ id: `${props.id}` }}>View More</Link></button>
    </div>
    </div>
  );
}

export default ProductCard;
