import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import UsersCard from "../../components/users/UsersCard";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const [users, setusers] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    //Create a query against the collection.
    const q = query(
      usersRef,
      // where("state", "==", "CA"),
      orderBy("createdTime"),
    //   limit(10)
    );
    const querySnapshot = getDocs(q);
    querySnapshot.then((doc) => {
      let users = [];
      doc.forEach((doc) => {
        users.push(doc.data());
      });
      setusers(users);
      console.log(users);
    });
  }, []);
  return (
    <div>
      <h1>All Users</h1>
      <div>
      <button><Link to={`/create-user`}>Create User</Link></button>
      </div>
      <div>
        {users ? (
          <div>
            {users.map((user, index) => {
              return <UsersCard key={index} user={user} />;
            })}
          </div>
        ) : (
          <div>No Users</div>
        )}
      </div>
    </div>
  );
}
