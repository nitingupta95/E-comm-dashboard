import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Correctly defined navigate

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const collectData = async () => {
    console.log(username, email, password);
    let result = await fetch("http://localhost:5000/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    result = await result.json();
    console.warn(result);

    if (result) {
      navigate('/'); // Corrected from 'naviagte' to 'navigate'
    }
    localStorage.setItem('user', JSON.stringify(result));
  };

  return (
    <div className="signup">
      <h1>Register</h1>
      <form>
        <label>Username: </label>
        <br />
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter name"
        />
        <br />
        <label>Enter Email: </label>
        <br />
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <br />
        <label> Password: </label>
        <br />
        <input
          type="password"
          name="confirm_password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <br />
        <button onClick={collectData} type="button">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
