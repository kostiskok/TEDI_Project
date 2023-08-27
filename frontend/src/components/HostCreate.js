import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import APIService from '../APIService';

function HostCreate() {

    const [token] = useCookies(['mytoken'])
    const [userid] = useCookies(['userid'])
    const [status] = useCookies(['status'])

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    //map for long and lat
    const [address, setAddress] = useState('')
    const [transportation, setTransportation] = useState('')
    //dates
    const [priceDay, setPriceDay] = useState(50)
    const [pricePerson, setPricePerson] = useState(10)
    const [maxPerson, setMaxPerson] = useState(2)
    const [rules, setRules] = useState('')
    const [numBeds, setNumBeds] = useState(1)
    const [numBedrooms, setNumBedrooms] = useState(1)
    const [numBathrooms, setNumBathrooms] = useState(1)
    const [type, setType] = useState('')
    const [area, setArea] = useState(20)
    const [lr, setLr] = useState(false)
    const [wifi, setWifi] = useState(false)
    const [ac, setAc] = useState(false)
    const [heating, setHeating] = useState(false)
    const [stove, setStove] = useState(false)
    const [tv, setTv] = useState(false)
    const [parking, setParking] = useState(false)
    const [elevator, setElevator] = useState(false)

    /*
    * If the user is not a host, redirect him to the home page
    **/
    let navigate = useNavigate()
    useEffect(() => {
        if (!status['status'] || !status['status'].isHost){
            navigate('/')
        }
    }, [status])
  
    const createRoom = () => {

        APIService.createRoom(token['mytoken'], userid['userid'], name, desc, address, transportation, priceDay, pricePerson, maxPerson, rules, numBeds, numBedrooms, numBathrooms, type, area, lr, wifi, ac, heating, stove, tv, parking, elevator)
        .then(resp => console.log(resp))
        .catch(error => console.log(error))

    }

  return (
    <div className='container p-2'>
        <h1>Create a new Room</h1><hr/>
        <div className='container'>

            <div className='row mb-3'>
                <div className='col-lg-2 text-end'>
                    <label htmlFor='name' className='form-label'>Name</label>
                </div>
                <div className='col-lg-10'>
                    <input type='text' className='form-control' id='name' placeholder='Name'
                    value = {name} onChange={e => setName(e.target.value)}/>
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-lg-2 text-end'>
                    <label htmlFor='desc' className='form-label'>Description</label>
                </div>
                <div className='col-lg-10'>
                    <textarea className='form-control' id='desc' placeholder='Description' rows='3'
                    value = {desc} onChange={e => setDesc(e.target.value)}/>
                </div>
            </div>
            <br/>
            <div className='bg-warning mb-3'>
                MAP
            </div>
            <div className='row mb-3'>
                <div className='col-lg-2 text-end'>
                    <label htmlFor='address' className='form-label'>Address</label>
                </div>
                <div className='col-lg-10'>
                    <input type='text' className='form-control' id='address' placeholder='Address'
                    value = {address} onChange={e => setAddress(e.target.value)}/>
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-lg-2 text-end'>
                    <label htmlFor='transportation' className='form-label'>Transportation</label>
                </div>
                <div className='col-lg-10'>
                    <input type='text' className='form-control' id='transportation' placeholder='Transportation'
                    value = {transportation} onChange={e => setTransportation(e.target.value)}/>
                </div>
            </div>
            <br/>
            <div className='row mb-3'>
                <div className='col-lg-2 text-end bg-warning'>
                    <label htmlFor='transportation' className='form-label'>Starting Date</label>
                </div>
                <div className='col-lg-2'>
                    <input type='date' className='form-control'/>
                </div>
                <div className='col-lg-3 text-end'>
                    <label htmlFor='price_per_day' className='form-label'>Price per day:</label>
                </div>
                <div className='col-lg-1'>
                    <input type='number' className='form-control' id='price_per_day'
                    value = {priceDay} onChange={e => setPriceDay(e.target.value)}/>
                </div>
                <div className='col-lg-3 text-end'>
                    <label htmlFor='price_per_person' className='form-label'>Price per person:</label>
                </div>
                <div className='col-lg-1'>
                    <input type='number' className='form-control' id='price_per_person'
                    value = {pricePerson} onChange={e => setPricePerson(e.target.value)}/>
                </div>
            </div>
            <div className='row mb-3'>
            <div className='col-lg-2 text-end bg-warning'>
                    <label htmlFor='transportation' className='form-label'>End Date</label>
                </div>
                <div className='col-lg-2'>
                    <input type='date' className='form-control'/>
                </div>
                <div className='col-lg-7 text-end'>
                    <label htmlFor='maxperson' className='form-label'>Max number of people:</label>
                </div>
                <div className='col-lg-1'>
                    <input type='number' className='form-control' id='maxperson'
                    value = {maxPerson} onChange={e => setMaxPerson(e.target.value)}/>
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-lg-2 text-end'>
                    <label htmlFor='rules' className='form-label'>Rules</label>
                </div>
                <div className='col-lg-10'>
                    <input type='text' className='form-control' id='rules' placeholder='Rules'
                    value = {rules} onChange={e => setRules(e.target.value)}/>
                </div>
            </div>
            <br/>
            <div className='row mb-3'>
                <div className='col-lg-2 text-end'>
                    <label htmlFor='numbeds' className='form-label'>Number of beds:</label>
                </div>
                <div className='col-lg-1'>
                    <input type='number' className='form-control' id='numbeds'
                    value = {numBeds} onChange={e => setNumBeds(e.target.value)}/>
                </div>
                <div className='col-lg-4 text-end'>
                    <label htmlFor='numbedrooms' className='form-label'>Number of bedrooms:</label>
                </div>
                <div className='col-lg-1'>
                    <input type='number' className='form-control' id='numbedrooms'
                    value = {numBedrooms} onChange={e => setNumBedrooms(e.target.value)}/>
                </div>
                <div className='col-lg-3 text-end'>
                    <label htmlFor='numbathrooms' className='form-label'>Number of bathrooms:</label>
                </div>
                <div className='col-lg-1'>
                    <input type='number' className='form-control' id='numbathrooms'
                    value = {numBathrooms} onChange={e => setNumBathrooms(e.target.value)}/>
                </div>
            </div>
            <div className='row mb-3'>
                <div className="col-lg-2 text-end"> 
                    <label htmlFor='type' className='form-label'>Room Type</label>
                </div>
                <div className="col-lg-3">
                    <select className="form-select" id="type" value={type} onChange={s => setType(s.target.value)}>
                        <option value="">Any Room Type</option>
                        <option value="p">Private</option>
                        <option value="h">House</option>
                        <option value="s">Shared</option>
                    </select>
                </div>
                <div className='col-lg-6 text-end'>
                    <label htmlFor='area' className='form-label'>Area (in square meters):</label>
                </div>
                <div className='col-lg-1'>
                    <input type='number' className='form-control' id='area'
                    value = {area} onChange={e => setArea(e.target.value)}/>
                </div>
            </div>
            <div className="row mb-2">
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
        <br/>
        <div className='text-end'>
            <button className='btn btn-success col-6' onClick={createRoom}>Create</button>
        </div>
        

    </div>
  )
}

export default HostCreate