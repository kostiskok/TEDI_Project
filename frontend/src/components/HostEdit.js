import React, {useState, useEffect} from "react";
import APIService from "../APIService";
import { useCookies } from 'react-cookie';
import { useNavigate, useParams, Link } from 'react-router-dom';

function HostEdit() {

  const [status, setStatus] = useCookies(['status'])

  /*
  * If the user is not a host, redirect him to the home page
  **/
  let navigate = useNavigate()
  useEffect(() => {
      if (!status['status'] || !status['status'].isHost){
          navigate('/')
      }
  }, [status])

  const { id } = useParams()

  const [room, setRoom] = useState([])
  const [user, setUser] = useState([])
  const [token] = useCookies(['mytoken'])

  useEffect(() => {
    APIService.getRoom(id)
      .then(resp => setRoom(resp))
      .catch(error => console.log(error))
  }, [])


  useEffect(() => {
    APIService.getRoom(id)
      .then(resp => setRoom(resp))
      .catch(error => console.log(error))
  }, [])


  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      // Handle checkbox input
      setRoom((prevRoom) => ({
        ...prevRoom,
        [name]: checked, // Update the boolean value based on the checkbox state
      }));
    } else {
      setRoom((prevRoom) => ({
        ...prevRoom,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = () => {
    APIService.updateRoom(id,room.num_of_beds,room.num_of_bathrooms,room.room_type,room.num_of_bedrooms,room.living_room,room.wifi,room.air_condition,room.heating,room.stove,room.television,room.parking,room.elevator,room.desc,room.rules,token['mytoken'])
  };

  return (
    <div>
      <h2>Editing Room</h2>
      <form>
        <label>
          Number of beds:
          <input
            type="number"
            name="num_of_beds"
            value={room.num_of_beds}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of bathrooms:
          <input
            type="number"
            name="num_of_bathrooms"
            value={room.num_of_bathrooms}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Type of rented space:
          <select
            name="room_type"
            value={room.room_type}
            onChange={handleInputChange}
          >
            <option value="p">Private</option>
            <option value="h">House</option>
            <option value="s">Share</option>
          </select>
        </label>
        <br />
        <label>
          Number of bedrooms:
          <input
            type="text"
            name="num_of_bedrooms"
            value={room.num_of_bedrooms}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Has living room: 
          <input
            type="checkbox"
            checked={room.living_room}
            name="living_room"
            value={room.living_room}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Has wifi: 
          <input
            type="checkbox"
            checked={room.wifi}
            name="wifi"
            value={room.wifi}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Has air condition: 
          <input
            type="checkbox"
            checked={room.air_condition}
            name="air_condition"
            value={room.air_condition}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Has heating: 
          <input
            type="checkbox"
            checked={room.heating}
            name="heating"
            value={room.heating}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Has stove: 
          <input
            type="checkbox"
            checked={room.stove}
            name="stove"
            value={room.stove}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Has television: 
          <input
            type="checkbox"
            checked={room.television}
            name="television"
            value={room.television}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Has parking: 
          <input
            type="checkbox"
            checked={room.parking}
            name="parking"
            value={room.parking}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Has elevator: 
          <input
            type="checkbox"
            checked={room.elevator}
            name="elevator"
            value={room.elevator}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Room description: 
          <input
            type="text"
            name="desc"
            value={room.desc}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Room rules: 
          <input
            type="text"
            name="rules"
            value={room.rules}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </form>

    </div>
  )
}

export default HostEdit