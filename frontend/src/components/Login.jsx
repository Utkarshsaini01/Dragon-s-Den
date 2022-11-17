import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate("/product");
        }
    }, []);


    async function handleLogin(){
        // console.log("i am clicked");
        let result = await fetch("http://localhost:8000/login", {
            method: "post",
            body: JSON.stringify({email,password}),
            headers:{
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        // console.log(result);
        if(result.name){
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/product");
        } else {
            alert("Please Enter Correct Details");
        }
    }

    return(
        <div className='loginform'>
            <h1>Login</h1>
            <input className="inputBox" type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter Email" />
            <input className="inputBox" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Password" />
            <button onClick={handleLogin} className="btn">Login</button>
        </div>
    );
}

export default Login;