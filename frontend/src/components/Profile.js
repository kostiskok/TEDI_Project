import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import APIService from "../APIService";

import EditProfile from "./EditProfile";

function Profile() {

  const [token, setToken] = useCookies(['mytoken'])
  const [isLogged, setLogged] = useState(false)

  const [users, setUsers] = useState([])
  const [editing, setEditing] = useState(false); // State to control editing mode

  // Change the var isLogged when the user logs
  useEffect(() => {
    if (token['mytoken']) {
      setLogged(true)
    } else {
      setLogged(false)
    }
  }, [token])

  useEffect(() => {
    APIService.getUsers()
      .then(resp => setUsers(resp))
      .catch(error => console.log(error))
  }, [])

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  return (
    <div className='container pt-3'>
      <h1>My profile</h1><hr />
      {users && users.map((user, index) => {
        return (
          <div className='mb-3' key={index}>
            <div className='row'>
              <div className='col-lg-4'>
                <b>Photo will be here</b>
              </div>
            </div>

            <div className='row'>
              <div className='col-lg-4'>
                <b>Username</b> {user.username}
              </div>
            </div>

            <div className='row'>
              <div className='col-lg-4'>
                <b>Password</b> {user.password}
              </div>
            </div>

            <div className='row'>
              <div className='col-lg-4'>
                <b>Email</b> {user.email}
              </div>
            </div>

            <div className='row'>
              <div className='col-lg-4'>
                <b>Phone</b> {user.phone}
              </div>
            </div>
            <br />
            {editing ? (
              <EditProfile user={user} onCancelEdit={handleCancelEdit} />
            ) : (
              <button onClick={handleEditClick}><b>Edit Profile</b></button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Profile;
