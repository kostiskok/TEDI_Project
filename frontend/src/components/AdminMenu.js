import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import APIService from '../APIService';

function AdminMenu() {

    const [token, setToken] = useCookies(['mytoken'])
    const [status, setStatus] = useCookies(['status'])

    const [users, setUsers] = useState([''])
    const [approve, setApprove] = useState(0)

    /*
    * If the user is not an admin, redirect him to the home page
    **/
    let navigate = useNavigate()
    useEffect(() => {
        if (!status['status'] || !status['status'].isAdmin){
            navigate('/')
        }
    }, [status])

    useEffect(() => {

        APIService.getUsers()
        .then(resp => setUsers(resp))
        .catch(error => console.log(error))

    }, [approve])

    const approveHost = (id) => {
        APIService.approveHostUser(id, token['mytoken'])
        setApprove(approve+1)
    }

    const handleExports = () => {

        return(
            <div>
                <div>Exports</div>
                <hr/>
            </div>
        )

    }

  return (
    <div className='container p-2'>
      <h1>Admin Menu</h1>
      <hr/>
      {handleExports()}
      {users && users.map((user,index) => {
        return (
            <div className='mb-3' key={index}>
            <div className="card">
                <div className='card-body bg-light'>

                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <h2>{user.username}</h2>
                        </div>
                        <div className='col-lg-6 text-end text-black-50'>
                            <h4>id: {user.id}</h4>
                        </div>
                    </div>
                    <hr/>
                    <div className='row'>
                        <div className='col-lg-3'>
                            <b>First Name</b> {user.first_name}
                        </div>
                        <div className='col-lg-3'>
                            <b>Last Name</b> {user.last_name}
                        </div>
                        <div className='col-lg-3'>
                            <b>Email</b> {user.email}
                        </div>
                        <div className='col-lg-3'>
                            <b>Phone</b> {user.phone}
                        </div>
                    </div>
                    <br/>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <h4>
                            <b>
                            {user.isAdmin ? ' Administrator ' : null}
                            </b>

                            <span className='text-success'>
                            {user.isHost ? ' Host ' : null}
                            </span>

                            <span className='text-danger'>
                            {user.waitingHost ? ' Host ' : null}
                            </span>
                            
                            <span>
                            {user.isRenter ? ' Renter ' : null}
                            </span>
                            </h4>
                        </div>
                        <div className='col-lg-6 text-end'>
                            {user.waitingHost
                            ? <button className='btn btn-success' onClick={() => approveHost(user.id)}>Approve Host</button>
                            : null}
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

export default AdminMenu