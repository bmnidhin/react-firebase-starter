import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Redirect } from "react-router-dom";
import { useState } from "react";

export default function LoginPage(props) {
const [user, setuser] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        setuser(user)
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
