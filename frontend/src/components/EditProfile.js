import React, { useState } from "react";

function EditProfile({ user, onCancelEdit }) {
  const [editedUser, setEditedUser] = useState({
    username: user.username,
    password: user.password,
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
    //I have to check if there are any duplicates, then save the changes
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
