import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  setDoc,
  FieldValue,
  doc,
} from "firebase/firestore";

export default function NewUser() {
  const [createdTime, setcreatedTime] = useState("");
  const [dob, setdob] = useState("");
  const [email, setemail] = useState("");
  const [loginMethod, setloginMethod] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [profilePic, setprofilePic] = useState(
    "https://lh3.googleusercontent.com/a-/AOh14Gin9IobQ4O2GMxz3n8OA6y9rgebNXByl6xtvj-Xq-w=s96-c"
  );
  const [uid, setuid] = useState("");

  const handleSubmit = (event) => {
    const db = getFirestore();
    const users = doc(collection(db, "users"));
    const docRef = setDoc(users, {
      createdTime: new Date(),
      dob: dob,
      email: email,
      loginMethod: "Custom",
      name: name || "No Name",
      phone: phone,
      profilePic: profilePic,
      uid: users.id,
    });
    docRef
      .then(function (docRef) {
        alert("Success")
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    event.preventDefault();
  };

  return (
    <div>
      <h1>New User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="Name"
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Phone
          <input
            name="phone"
            type="tel"
            value={phone}
            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            onChange={(e) => setphone(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          DOB:
          <input
            name="dob"
            type="date"
            value={dob}
            onChange={(e) => setdob(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}
