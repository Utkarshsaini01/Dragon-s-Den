// /*jshint esversion: 6 */
import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [equity, setEquity] = useState('');
    const [productName, setProductName] = useState('');
    const [file, setFile] = useState(null);
    const [videoURL, setURL] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const userId = JSON.parse(localStorage.getItem('user'))._id;


    const addProduct = async () => {

        let formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('equity', equity);
        formData.append('userId', userId);
        formData.append('productname', productName);
        formData.append('videoURL', videoURL);
        formData.append('image', file);
        formData.append('description', description);
           
        let result = await fetch('http://localhost:8000/add-product', {
          method: 'post',
          body: formData
        });

         result = await result;
         if(result){
            setName('');
            setPrice('');
            setEquity('');
            setProductName('');
            setFile('');
            setURL('');
            setDescription('');
            navigate("/product");
         }

    }

    

    return(
        <div>
            <div className='product'>
            <h1> Add Product </h1>
            
            <input className='inputBox' type="text" placeholder='Enter Your name'
             onChange={(e) => {setName(e.target.value)}} value={name} required/>
             <input className='inputBox' type="text" placeholder='Enter Product name'
             onChange={(e) => {setProductName(e.target.value)}} value={productName} required/>
            <input className='inputBox' type="text" placeholder='Enter Product price'
             onChange={(e) => {setPrice(e.target.value)}} value={price} required/>
            <input className='inputBox' type="text" placeholder='Enter Product equity'
             onChange={(e) => {setEquity(e.target.value)}} value={equity} required/>
            <input className='inputBox' type="url"  placeholder='Description Video URL' onChange={(e) => {setURL(e.target.value)}} value={videoURL} required/> <br />
            <textarea className="textarea" name="description" cols="30" rows="10" value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder= "Enter Product description" required></textarea>
            <input className='inputBox' type="file" onChange={(e) => {setFile(e.target.files[0])}} required/>
            <button  onClick={addProduct} className='btn'>Add Product</button>
            </div>
            <div className="timepass"></div>
        </div>
    );
}


export default AddProduct;