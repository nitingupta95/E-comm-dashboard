import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
        <img alt="logo" className="logo" src="https://imgs.search.brave.com/HnMiOe3zk5z8nm2rFdrm5GRhkKEvUprsW_t6Inqzx7M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/bWFrci5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjMvMDQv/Q29uZWN0LnBuZw"/>
      {auth ? (
        <div className="nav">
          <ul>
            <li>
              <Link to="/"> Products</Link>
            </li>
            <li>
              <Link to="/add"> Add product</Link>
            </li>
            <li>
              <Link to="/update"> Update product</Link>
            </li>
            <li>
              <Link to="/profile"> Profile</Link>
            </li>
            <li>
              <Link onClick={logout}  to="/signup">
                {" "}
                Logout {JSON.parse(auth).username}
              </Link>
            </li>
          </ul>
        </div>

      ) : (
        <div className="nav navright">
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login"> Login</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default Nav;
