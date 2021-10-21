import React from 'react'
import { Link } from 'react-router-dom'
export default function UsersCard(props) {
    return (
        <div style={{padding:20}}>
            <img src={props.user?.profilePicture} width="50px"/>
            <h3>{props.user?.name}</h3>
            <p>{props.user?.email}</p>

            <button><Link to={`/users/${props.user?.uid}`}>Manage User</Link></button>
            <hr/>
            
        </div>
    )
}
