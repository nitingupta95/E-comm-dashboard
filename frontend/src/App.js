 import './App.css';
import Nav from "./components/Nav";
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import Addproduct from './components/Addproduct';
import ProductList from './components/productList';
import UpdateProduct from './components/UpdateProduct';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Nav/>
       <Routes>

        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/add" element={<Addproduct/>}/>
        <Route path="/update/:id" element={<UpdateProduct/>}/>
        <Route path="/logout" element={<h1>logout listing component</h1>}/>
        <Route path="/profile" element={<h1>profile listing component</h1>}/>
        </Route>

        <Route path='/signup'element={<Signup/>} />
        
        <Route path='/login' element={<Login/>}/>
        </Routes>
       </BrowserRouter>
       <Footer/>
    </div>
  );
}

export default App;
