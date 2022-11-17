import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

function DetailCard(props){
    const [payed, setPayed] = useState(false);
    const id = props.id;
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const navigate = useNavigate();


    async function handlePay(){
        // console.log("i am clicked");
        let result = await fetch("http://localhost:8000/pay/"+id+"/"+userId, {
            method: "post",
        });
        result = await result.json();
        setPayed(true)
        // console.log(result);
    }
    
    if(payed){
        navigate("/product");
    } 

    return(
        <div className="cont">
        <p className="head">{props.productname}</p>

        <div className="yout">
            <iframe width="560" height="315" src={props.videoURL}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                id="yt"
                frameborder="0"
                allowfullscreen></iframe>
        </div>

        <div className="desc">
            <p>
                {props.description}

            </p>
            <p className="equity">
                Equity: {props.equity} <br />
                Valuation: {props.price}
            </p>
        </div>
        <div className="button">
            <button className="pay" onClick={handlePay}>Pay Now</button>
        </div>
    </div>
    );
}

export default DetailCard;