import React, { useState } from "react";
import APIService from "../APIService";

//apiservice line 51

function EditProfile({ user, onCancelEdit }) {
  const [editedUser, setEditedUser] = useState({
    username: user.username,
    password: user.password,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
  });

  const [duplicateUsername, setDuplicateUsername] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
  };

  return (
    <div>
      <h2>Editing Profile</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={editedUser.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={editedUser.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={editedUser.first_name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Last:
          <input
            type="text"
            name="username"
            value={editedUser.last_name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={editedUser.phone}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
