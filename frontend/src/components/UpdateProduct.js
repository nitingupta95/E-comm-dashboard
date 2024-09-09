import React, { useEffect, useState } from "react";
import { useParams,useNavigate, redirect } from "react-router-dom";
function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params= useParams();
    const naviagate= useNavigate();
    useEffect(()=>{
        getProductDetails();
    },[])
    const getProductDetails = async () => {
        console.warn(params);
        let result=await fetch(`http://localhost:5000/product/${(params.id)}`);
        result=await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category)
        setCompany(result.company)
    }

    const updateProduct = async () => {
      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      result = await result.json();
      naviagate('/');
    };
    
  return (
    <div className="signup">
      <h1>Update Product</h1>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        value={name}
        placeholder="Enter product name"
      />
      <br />
     

      <input
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        type="text"
        value={price}
        placeholder="Enter product price"
      />
      <br />
       

      <input
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        type="text"
        value={category}
        placeholder="Enter product category"
      />
      <br />
       

      <input
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        type="text"
        value={company}
        placeholder="Enter product company"
      />
      <br />
       
      <br />

      <button onClick={updateProduct}  style={{ textAlign: "center" }}>
        Update Product
      </button>
    </div>
  );
}

export default UpdateProduct;
