import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export default function ManageUser(props) {
  const [user, setuser] = useState([]);
  const [createdTime, setcreatedTime] = useState("");
  const [dob, setdob] = useState("");
  const [email, setemail] = useState("");
  const [loginMethod, setloginMethod] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [profilePic, setprofilePic] = useState("");

  useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, "users", props.match.params.id); //id from url params
    const docSnap = getDoc(docRef);

    docSnap.then((docSnap) => {
      if (docSnap.data()) {
        console.log("Document data:", docSnap.data());
        setuser(docSnap.data());
        setcreatedTime(docSnap.data().createdTime);
        setdob(docSnap.data().dob);
        setemail(docSnap.data().email);
        setloginMethod(docSnap.data().loginMethod);
        setname(docSnap.data().name);
        setphone(docSnap.data().phone);
        setprofilePic(docSnap.data().profilePic);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
    // console.log(docSnap);
  }, []);

  const handleSubmit = (event) => {
    const db = getFirestore();
    const users = doc(db, "users", props.match.params.id);

    const docRef = setDoc(
      users,
      {
        dob: dob,
        email: email,
        name: name || "No Name",
        phone: phone,
      },
      { merge: true }
    );
    docRef
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    event.preventDefault();
  };

  const handleDelete = (event) => {
    let confirm = window.confirm("Are you sure you want to delete this user?");
    if (confirm) {
      const db = getFirestore();
      const users = doc(db, "users", props.match.params.id);
      deleteDoc(users)
        .then(function () {
          alert("User deleted successfully");
        })
        .catch(function (error) {
          alert("Error deleting user");
        });
    } else {
    }
  };
  return (
    <div>
      {props.match.params.id}
      <div>
        <div style={{ padding: 20 }}>
          <img src={user?.profilePicture} width="50px" />
          <h1>{user.name}</h1>
          <p>{user?.email}</p>

          <button onClick={() => handleDelete()}>Delete User</button>
          <hr />
        </div>
        <div>
          <h2>Edit User</h2>
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
      </div>
    </div>
  );
}
