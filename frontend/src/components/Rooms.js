import React, {useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";

import APIService from "../APIService";

function Rooms() {
    const location = useLocation();
    const maxPerson = location.state && location.state.maxPerson;
    const position = location.state && location.state.pos;
    const dateStart = location.state && location.state.dateStart;
    const dateEnd = location.state && location.state.dateEnd;

    const [rooms, setRooms] = useState([])
    const [next, setNext] = useState('')
    const [prev, setPrev] = useState('')
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(1)

    const [users, setUsers] = useState([])
    const [reviews, setReviews] = useState([])

    const [type, setType] = useState('')
    const [maxCost, setMaxCost] = useState('')
    const [lr, setLr] = useState(false)
    const [wifi, setWifi] = useState(false)
    const [ac, setAc] = useState(false)
    const [heating, setHeating] = useState(false)
    const [stove, setStove] = useState(false)
    const [tv, setTv] = useState(false)
    const [parking, setParking] = useState(false)
    const [elevator, setElevator] = useState(false)

    useEffect(() => {

        APIService.getUsers()
        .then(resp => setUsers(resp))
        .catch(error => console.log(error))

        APIService.getReviewDetails()
        .then(resp => setReviews(resp))
        .catch(error => console.log(error))

    }, [])

    useEffect(() => {

        APIService.getRooms(page, maxPerson, position, dateStart, dateEnd, type, maxCost, lr, wifi, ac, heating, stove, tv, parking, elevator)
        .then(resp => resp 
          ? [setRooms(resp.results), setNext(resp.next), setPrev(resp.previous), setCount(resp.count)] 
          : console.log("Error in fetching rooms")
        )
        .catch(error => console.log(error))

    }, [page, maxPerson, position, dateStart, dateEnd, type, maxCost, lr, wifi, ac, heating, stove, tv, parking, elevator])

    const pageManagement = (top) => {

        var pageStart = 10*(page-1) + 1
        var pageEnd = (10*page) > count ? count : 10*page

        return(
            <div className="mb-3">
                {top ? <p className="text-end">Showing {pageStart} - {pageEnd} of {count} results</p> : <hr/>}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <button className={!prev ? "btn btn-secondary" : "btn btn-info"} onClick={() => setPage(page-1)} disabled = {!prev}>Prev</button>
                        </div>
                        <div className="col text-end">
                            <button className={!next ? "btn btn-secondary" : "btn btn-info"} onClick={() => setPage(page+1)} disabled = {!next} >Next</button>
                        </div>
                    </div>
                </div>
                {top ? <hr/> : null}
            </div>
        )

    }

    const filterManagement = () => {

        return(
            <div>
                <p>Choose <b>filters</b> for your results:</p>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <select className="form-select" id="type" value={type} onChange={s => setType(s.target.value)}>
                                <option value="">Any Room Type</option>
                                <option value="p">Private</option>
                                <option value="h">House</option>
                                <option value="s">Shared</option>
                            </select>
                        </div>
                        <div className="col-lg-6 text-center">
                            <input type="range" className="form-range" id="maxcost" min="0" max="500" value={maxCost} onChange={e => setMaxCost(e.target.value)}/>
                            <label className="form-range-label" htmlFor="maxcost">Max Cost per Day: {maxCost} </label>
                        </div>
                    </div>
                    <br/>
                    <div className="bg-light p-2">
                    <div className="row">
                        <div className="col-lg-3">
                            <input className="form-check-input" type="checkbox" id="lr"
                            value= {lr} onChange={() => setLr(!lr)}/>
                            <label className="form-check-label" htmlFor="lr">Living Room</label>
                        </div>
                        <div className="col-lg-3 text-center">
                            <input className="form-check-input" type="checkbox" id="wifi"
                            value= {wifi} onChange={() => setWifi(!wifi)}/>
                            <label className="form-check-label" htmlFor="wifi">Wi-Fi</label>
                        </div>
                        <div className="col-lg-3 text-center">
                            <input className="form-check-input" type="checkbox" id="ac"
                            value= {ac} onChange={() => setAc(!ac)}/>
                            <label className="form-check-label" htmlFor="ac">Air Condition</label>
                        </div>
                        <div className="col-lg-3 text-end">
                            <input className="form-check-input" type="checkbox" id="heating"
                            value= {heating} onChange={() => setHeating(!heating)}/>
                            <label className="form-check-label" htmlFor="heating">Heating</label>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-lg-3">
                            <input className="form-check-input" type="checkbox" id="stove"
                            value= {stove} onChange={() => setStove(!stove)}/>
                            <label className="form-check-label" htmlFor="stove">Stove</label>
                        </div>
                        <div className="col-lg-3 text-center">
                            <input className="form-check-input" type="checkbox" id="tv"
                            value= {tv} onChange={() => setTv(!tv)}/>
                            <label className="form-check-label" htmlFor="tv">Television</label>
                        </div>
                        <div className="col-lg-3 text-center">
                            <input className="form-check-input" type="checkbox" id="parking"
                            value= {parking} onChange={() => setParking(!parking)}/>
                            <label className="form-check-label" htmlFor="parking">Parking</label>
                        </div>
                        <div className="col-lg-3 text-end">
                            <input className="form-check-input" type="checkbox" id="elevator"
                            value= {elevator} onChange={() => setElevator(!elevator)}/>
                            <label className="form-check-label" htmlFor="elevator">Elevator</label>
                        </div>
                    </div>
                    </div>
                </div>

                <hr/>
            </div>
        )

    }
 
    const printRooms = () => {

        return(
            <div>
                {pageManagement(true)}
                {filterManagement()}
                <div className="row row-cols-2">
                    {rooms && rooms.map((item, index) => (
                    <div className="col mb-4" key={item.id}>
                        <div className="card"> 
                            <div className="card-body bg-light">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-9">
                                        <h2 className="text-start">{item.name}</h2>
                                        </div>
                                        <div className="col-lg-3">
                                            <h5 className="text-end text-black-50">

                                                {users && users.map(user => (

                                                    <div key={user.id}>
                                                        {item.owner === user.id ? `${user.first_name} ${user.last_name}` : null}
                                                    </div>

                                                ))}

                                            </h5>

                                        </div>
                                    </div>
                                </div>
                                <hr/><br/>
                                <img src={item.photo} style={{maxWidth: '100%', maxHeight: '600px'}}/>
                                <br/><br/>

                                {reviews && reviews.map(review => (

                                    <div key={review.id}>

                                        {review.id === item.id
                                        ? <div className="container">
                                            <div className="row">
        
                                                <div className="col-lg-6">
                                                    <ul>
                                                        <li>Type: {item.room_type === 'h' ? 'House' : item.room_type === 's' ? 'Shared' : 'Private'}</li>
                                                        <li>Num of beds: {item.num_of_beds}</li>
                                                        <li>Num of reviews: {item.id === review.id ? review.count : null}</li>
                                                    </ul>
                                                    <h4> {review.count === 0 ? <div>No Score Yet</div> : <div>{review.average/2}/5 stars</div>}</h4>
                                                </div>
                                            
                                                <div className="col-lg-6">
                                                    <h3 className="text-center">{item.price_per_day}$/day</h3>
                                                    <Link className='btn btn-success btn-lg col-12' role="button" 
                                                    to={`/rooms/${item.id}`} state={{dateStart: dateStart, dateEnd: dateEnd}}>View</Link>
                                                </div>
                                            </div>
                                        </div>
                                        : null}

                                    </div>

                                ))}

                                 
                            </div> 
                        </div>
                    </div>
                    ))}
                </div>
                {pageManagement(false)}
            </div>
        )

    }

    return <div className="container">
        <h1>Rooms</h1><hr/>
        {printRooms()}
    </div>;
}

export default Rooms;
