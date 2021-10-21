import React from "react";
import { Link,Redirect } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
export default function NavBar(props) {
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("You have been logged out!");
        window.location.href="/login"
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Dash</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      
      </ul>
      {`Hi ${props.currentUser ? props.currentUser?.email: 'No User'}`}
     {props.currentUser && <button onClick={logout}>Logout</button>}
    </div>
  );
}
