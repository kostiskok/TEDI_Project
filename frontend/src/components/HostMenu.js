import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import APIService from '../APIService';

function HostMenu() {

    const [token, setToken] = useCookies(['mytoken'])
    const [status, setStatus] = useCookies(['status'])

    const [rooms, setRooms] = useState([''])

    /*
    * If the user is not a host, redirect him to the home page
    **/
    let navigate = useNavigate()
    useEffect(() => {
        if (!status['status'] || !status['status'].isHost){
            navigate('/')
        }
    }, [status])

    useEffect(() => {
        APIService.hostRooms(token['mytoken'])
        .then(resp => setRooms(resp))
        .catch(error => console.log(error))
    }, [])

  return (
    <div className="container">

      <h1>Host Menu</h1> <br/>

      <Link className='btn btn-success' role="button" to="/host/create">Create a new Room</Link>
      <hr/>
      {rooms && rooms.map((room, index) => {
        return(
            <div className='mb-3' key={index}>
                <div className='card'>
                    <div className='card-body bg-light'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <b>{room.name}</b>
                                </div>
                                <div className='col-lg-6 text-end'>
                                    {/* <button className='btn btn-secondary'>View</button> */}
                                    <Link className='btn btn-secondary' role='button' to={`/host/${room.id}`}>View</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
      })}

    </div>
  )
}

export default HostMenu