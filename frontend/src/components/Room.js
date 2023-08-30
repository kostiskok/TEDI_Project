import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom'
import { useCookies } from "react-cookie";
import APIService from "../APIService";

function Room() {

    const { id } = useParams()

    const [rooms, setRooms] = useState([])
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogged, setLogged] = useState(false)

    // Change the var isLogged when the user logs
    useEffect(() => {
        if(token['mytoken']){
            setLogged(true)
        }
        else{
        setLogged(false)
        }
    }, [token])

    useEffect(() => {
      APIService.getRooms()
        .then(resp => setRooms(resp))
        .catch(error => console.log(error))
    }, [])

  return (
    <div className='container pt-3'>
    <h1>Room {id}</h1><hr />
    {rooms && rooms.map((item, index) => {
      return (
        <div className='mb-3' key={index}>
          <div className='row'>
            <div className='col-lg-4'>
              <b>Room photos will be here</b>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
              <b>Bla bla bla</b> 
            </div>
          </div>

          <br />
          {/* {editing ? (
            <EditProfile user={user} onCancelEdit={handleCancelEdit} />
          ) : (
            <button onClick={handleEditClick}><b>Edit Profile</b></button>
          )} */}
        </div>
      )
    })}
  </div>
  )
}

export default Room