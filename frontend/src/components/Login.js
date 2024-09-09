import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log(email, password);
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }), // Correctly format the body
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            console.warn(result);
            
            if (result.name) {
                localStorage.setItem('user', JSON.stringify(result));
                navigate('/');
            } else {
                alert('Invalid Email or Password');
            }
        } catch (error) {
            console.error("Login failed: ", error);
            alert('An error occurred while logging in. Please try again.');
        }
    };

    return (
        <div className='signup'>
            <input
                type='text'
                placeholder='enter email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <br />
            <input
                type='password'
                placeholder='enter password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <br />
            <button onClick={handleLogin} >Login</button>
        </div>
    );
}

export default Login;
