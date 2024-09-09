import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch('http://localhost:5000/products');
    let data = await result.json();
    setProducts(data);
  };
   
  const deleteproduct = async (id)=>{
    
    let result= await fetch(`http://localhost:5000/product/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    result= await result.json();
    if(result){
      alert("record is deleted");
    }
    window.location.reload();
  }
  const searchHandle=async (e)=>{
    let key= e.target.value;
    if(key){
      let result= await fetch(`http://localhost:5000/search/${key}`)
    let data= await result.json();
    if(data){
      setProducts(data);
    }
    }
    else{
      getProducts();
    }
  }
  return (
    <div className='product-list'>
      <h1>Product List</h1>
      <input onChange={searchHandle} className='searchproduct' type='text' placeholder='Search Product...'></input>
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length>0 ? products.map((product, index) => (
        <ul key={product._id}>
            <li>{index + 1}</li>
            <li>{product.name}</li>
            <li> {product.price}</li>
            <li>{product.category}</li>
            <li><button onClick={()=>deleteproduct(product._id)}>Delete</button>
            <Link to={"/update/"+product._id}>Update </Link>
            </li>
        </ul>
      )): <h1>No record found</h1>
      }
    </div>
  );
}

export default ProductList;
