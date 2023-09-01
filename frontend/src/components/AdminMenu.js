import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import APIService from '../APIService';

function AdminMenu() {

    const [token] = useCookies(['mytoken'])
    const [status] = useCookies(['status'])

    const [users, setUsers] = useState([''])
    const [approve, setApprove] = useState(0)

    const [id, setId] = useState('')
    const [fileType, setFileType] = useState('json')

    /*
    * If the user is not an admin, redirect him to the home page
    **/
    let navigate = useNavigate()
    useEffect(() => {
        if (!status['status'] || !status['status'].isAdmin){
            navigate('/')
        }

        APIService.getReviewsByHostXML(3)
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

    const RoomExport = () => {

        if (fileType === 'json'){
            APIService.adminRooms(token['mytoken'])
            // APIService.adminRoomsXML(token['mytoken'])
            .then(resp => {
                const blob = new Blob([JSON.stringify(resp)], {type: 'text/json'});
                return blob;
            })
            .then(blob => {
                const a = document.createElement('a');
                a.download = "rooms.json";
                a.href = window.URL.createObjectURL(blob);
                const clickEvt = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                    });
                a.dispatchEvent(clickEvt);
                a.remove()
            }) 
        }
        else{
            APIService.adminRoomsXML(token['mytoken'])
            .then(resp => {
                const blob = new Blob([resp], {type: 'application/xml'});
                return blob;
            })
            .then(blob => {
                const a = document.createElement('a');
                a.download = "rooms.xml";
                a.href = window.URL.createObjectURL(blob);
                const clickEvt = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                    });
                a.dispatchEvent(clickEvt);
                a.remove()
            })
        }

    }

    const BookingExport = () => {

        if (fileType === 'json'){
            APIService.getBookings()
            .then(resp => {
                const blob = new Blob([JSON.stringify(resp)], {type: 'text/json'});
                return blob;
            })
            .then(blob => {
                const a = document.createElement('a');
                a.download = "bookings.json";
                a.href = window.URL.createObjectURL(blob);
                const clickEvt = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                    });
                a.dispatchEvent(clickEvt);
                a.remove()
            })
        }
        else{
            APIService.getBookingsXML()
            .then(resp => {
                const blob = new Blob([resp], {type: 'application/xml'});
                return blob;
            })
            .then(blob => {
                const a = document.createElement('a');
                a.download = "bookings.xml";
                a.href = window.URL.createObjectURL(blob);
                const clickEvt = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                    });
                a.dispatchEvent(clickEvt);
                a.remove()
            })
        }
        
    }

    const reviewsUserExport = () => {

        if (fileType === 'json'){
            APIService.getReviewsByRenter(id)
            .then(resp => {
                const blob = new Blob([JSON.stringify(resp)], {type: 'text/json'});
                return blob;
            })
            .then(blob => {
                const a = document.createElement('a');
                a.download = `reviews_by_${id}.json`;
                a.href = window.URL.createObjectURL(blob);
                const clickEvt = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                    });
                a.dispatchEvent(clickEvt);
                a.remove()
            })
        }
        else{
            APIService.getReviewsByRenterXML(id)
            .then(resp => {
                const blob = new Blob([resp], {type: 'application/xml'});
                return blob;
            })
            .then(blob => {
                const a = document.createElement('a');
                a.download = `reviews_by_${id}.xml`;
                a.href = window.URL.createObjectURL(blob);
                const clickEvt = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                    });
                a.dispatchEvent(clickEvt);
                a.remove()
            })
        }
        
    }

    const reviewsHostExport = () => {

        if (fileType === 'json'){
            APIService.getReviewsByHost(id)
            .then(resp => {
                const blob = new Blob([JSON.stringify(resp)], {type: 'text/json'});
                return blob;
            })
            .then(blob => {
                const a = document.createElement('a');
                a.download = `reviews_to_${id}.json`;
                a.href = window.URL.createObjectURL(blob);
                const clickEvt = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                    });
                a.dispatchEvent(clickEvt);
                a.remove()
            })
        }
        else{
            APIService.getReviewsByHostXML(id)
            .then(resp => {
                const blob = new Blob([resp], {type: 'application/xml'});
                return blob;
            })
            .then(blob => {
                const a = document.createElement('a');
                a.download = `reviews_to_${id}.xml`;
                a.href = window.URL.createObjectURL(blob);
                const clickEvt = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                    });
                a.dispatchEvent(clickEvt);
                a.remove()
            })
        }
        
    }

    const handleExports = () => {

        return(
            <div>
                <div>Exports</div>
                <div className='container mt-3 mb-3'>
                    <div className='row mb-3'>
                        <div className='col-lg-3 text-start'>
                            <button className='btn btn-primary' onClick={RoomExport}>Rooms</button>
                        </div>
                        <div className='col-lg-3 text-center'>
                            <button className='btn btn-primary' onClick={BookingExport}>Bookings</button>
                        </div>
                        <div className='col-lg-3 text-center'>
                            <button className='btn btn-primary' onClick={reviewsUserExport}>Reviews by user</button>
                        </div>
                        <div className='col-lg-3 text-end'>
                            <button className='btn btn-primary' onClick={reviewsHostExport}>Reviews to host</button>
                        </div>
                    </div>
                    <div className='row text-end'>
                        <div className='col-lg-2'>
                            <div className='radio'>
                                <label>
                                    <input type="radio" name="type" value="json" onChange={e => setFileType(e.target.value)}/> Json
                                </label>
                            </div>
                            <div className='radio'>
                                <label>
                                    <input type="radio" name="type" value="xml" onChange={e => setFileType(e.target.value)}/> XML
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-2 offset-md-5'>
                            <label htmlFor='userid' className='form-label'>Enter User or Host Id:</label>
                        </div>
                        <div className='col-lg-2'>
                            <input type="text" id="userid" className='form-control' value={id} onChange={e => setId(e.target.value)}/>
                        </div>
                    </div>
                </div>
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