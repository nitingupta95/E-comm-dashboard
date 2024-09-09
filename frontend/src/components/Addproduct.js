import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Addproduct() {
  const navigate= useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError]= useState('');
  const addproductF = async () => {
    if(!name|| !price || !company || !category){
       
        setError('Please fill all the fields');
        return false;
    }
    console.log(name, price, category, company);
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/addproduct", {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
     
      window.location.reload();
    
    
    

  };

  return (
    <div className="signup">
      <h1>Addproduct</h1>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        value={name}
        placeholder="Enter product name"
      />
      <br/>
      { error && !name && <span>Enter valid name</span>}
      
      <input
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        type="text"
        value={price}
        placeholder="Enter product price"
      />
      <br />
      { error && !price && <span>Enter valid price</span>}

      <input
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        type="text"
        value={category}
        placeholder="Enter product category"
      />
      <br />
      { error && !category && <span>Enter valid category</span>}

      <input
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        type="text"
        value={company}
        placeholder="Enter product company"
      />
      <br />
      { error && !company && <span>Enter valid company</span>}
      <br/>

      <button onClick={addproductF} style={{ textAlign: "center" }}>
        Add Product
      </button>
    </div>
  );
}

export default Addproduct;
