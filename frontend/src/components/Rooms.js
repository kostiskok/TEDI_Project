import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import APIService from "../APIService";

function Rooms() {

    const [rooms, setRooms] = useState([])
    const [next, setNext] = useState('')
    const [prev, setPrev] = useState('')
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(1)

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

        APIService.getRooms(page, type, maxCost, lr, wifi, ac, heating, stove, tv, parking, elevator)
        .then(resp => resp 
          ? [setRooms(resp.results), setNext(resp.next), setPrev(resp.previous), setCount(resp.count)] 
          : console.log("Error in fetching rooms")
        )
        .catch(error => console.log(error))

    }, [page, type, maxCost, lr, wifi, ac, heating, stove, tv, parking, elevator])

    // useEffect(() => {

    //     setRoomHost([])
    //     var len = rooms.length
    //     for (var i = 0; i < len; i++){
    //         var new_host = [...roomHost, rooms[i].name]
    //         setRoomHost(new_host)
    //         console.log(i)
    //     }

    // }, [updateInfo])

    const pageManagement = () => {

        var pageStart = 10*(page-1) + 1
        var pageEnd = (10*page) > count ? count : 10*page

        return(
            <div>
                <p className="text-end">Showing {pageStart} - {pageEnd} of {count} results</p>
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
                <hr/>
            </div>
        )

    }

    // const getHosts = (id) => {

    //     var host = APIService.getUser(id)
    //             .then(resp => resp.json())

    //     setRoomHost([...roomHost, host.name])
    //     console.log(roomHost)

    // }

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
                {pageManagement()}
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
                                        <h4 className="text-end text-black-50">
                                            Owner{item.owner}</h4>
                                        </div>
                                    </div>
                                </div>
                                <hr/><br/>
                                <img src={item.photo} style={{maxWidth: '100%', maxHeight: '600px'}}/>
                                <br/><br/>
                                <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                    <ul>
                                        <li>Type: {item.room_type === 'h' ? 'House' : item.room_type === 's' ? 'Shared' : 'Private'}</li>
                                        <li>Num of beds: {item.num_of_beds}</li>
                                        <li>Num of reviews: -</li>
                                    </ul>
                                    <h4>SCORE</h4>
                                    </div>
                                        <div className="col-lg-6">
                                            <h3 className="text-center">{item.price_per_day}$/day</h3>
                                            <Link className='btn btn-success btn-lg col-12' role="button" to={`/rooms/${item.id}`}>View</Link>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        )

    }

  return <div className="container">
    <h1>Rooms</h1><hr/>
    {printRooms()}
  </div>;
}

export default Rooms;
