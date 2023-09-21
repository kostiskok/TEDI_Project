import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import APIService from '../APIService';

// Stuff needed for Openstreet Map / leaflet
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
const coordinates = [37.9708, 23.7261]; //Athens coordinates

function HostCreate() {

    const [token] = useCookies(['mytoken'])
    const [userid] = useCookies(['userid'])
    const [status] = useCookies(['status'])

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [photo, setPhoto] = useState(null)

    const [address, setAddress] = useState('')
    const [transportation, setTransportation] = useState('')
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
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

    //State and function for the OpenStreet Map
    const [position, setPosition] = useState(null)

    // Boolean flags for warnings/errors in create room
    const [pressedOnce, setPressedOnce] = useState(false)

    const [nameLegit, setNameLegit] = useState(false)
    const [descLegit, setDescLegit] = useState(false)
    const [addressLegit, setAddressLegit] = useState(false)
    const [dateStartLegit, setDateStartLegit] = useState(false)
    const [dateEndLegit, setDateEndLegit] = useState(false)
    const [priceDayLegit, setPriceDayLegit] = useState(true)
    const [pricePersonLegit, setPricePersonLegit] = useState(true)
    const [maxPersonLegit, setMaxPersonLegit] = useState(true)
    const [rulesLegit, setRulesLegit] = useState(false)
    const [numBedsLegit, setNumBedsLegit] = useState(true)
    const [numBedroomsLegit, setNumBedroomsLegit] = useState(true)
    const [numBathroomsLegit, setNumBathroomsLegit] = useState(true)
    const [typeLegit, setTypeLegit] = useState(false)
    const [areaLegit, setAreaLegit] = useState(true)

    useEffect(() => {
        if (name === ''){
            setNameLegit(false)
        }
        else{
            setNameLegit(true)
        }
    }, [name])

    useEffect(() => {
        if (desc === ''){
            setDescLegit(false)
        }
        else{
            setDescLegit(true)
        }
    }, [desc])

    useEffect(() => {
        if (address === ''){
            setAddressLegit(false)
        }
        else{
            setAddressLegit(true)
        }
    }, [address])

    useEffect(() => {
        if (address === ''){
            setAddressLegit(false)
        }
        else{
            setAddressLegit(true)
        }
    }, [address])

    useEffect(() => {
        if (dateStart === ''){
            setDateStartLegit(false)
        }
        else{
            setDateStartLegit(true)
        }
    }, [dateStart])

    useEffect(() => {
        if (dateEnd === ''){
            setDateEndLegit(false)
        }
        else{
            setDateEndLegit(true)
        }
    }, [dateEnd])

    useEffect(() => {
        if (priceDay === ''){
            setPriceDayLegit(false)
        }
        else{
            setPriceDayLegit(true)
        }
    }, [priceDay])

    useEffect(() => {
        if (pricePerson === ''){
            setPricePersonLegit(false)
        }
        else{
            setPricePersonLegit(true)
        }
    }, [pricePerson])

    useEffect(() => {
        if (maxPerson === ''){
            setMaxPersonLegit(false)
        }
        else{
            setMaxPersonLegit(true)
        }
    }, [maxPerson])

    useEffect(() => {
        if (rules === ''){
            setRulesLegit(false)
        }
        else{
            setRulesLegit(true)
        }
    }, [rules])

    useEffect(() => {
        if (numBeds === ''){
            setNumBedsLegit(false)
        }
        else{
            setNumBedsLegit(true)
        }
    }, [numBeds])

    useEffect(() => {
        if (numBedrooms === ''){
            setNumBedroomsLegit(false)
        }
        else{
            setNumBedroomsLegit(true)
        }
    }, [numBedrooms])

    useEffect(() => {
        if (numBathrooms === ''){
            setNumBathroomsLegit(false)
        }
        else{
            setNumBathroomsLegit(true)
        }
    }, [numBathrooms])

    useEffect(() => {
        if (type === ''){
            setTypeLegit(false)
        }
        else{
            setTypeLegit(true)
        }
    }, [type])

    useEffect(() => {
        if (area === ''){
            setAreaLegit(false)
        }
        else{
            setAreaLegit(true)
        }
    }, [area])

    function LocationMarker(){
        const map = useMapEvents({
            click(e){
                setPosition(e.latlng)
                // console.log(position)
            }
        })

        return position == null ? null : (
            <Marker position={position}/>
        )
    }

    /*
    * If the user is not a host, redirect him to the home page
    **/
    let navigate = useNavigate()
    useEffect(() => {
        if (!status['status'] || !status['status'].isHost){
            navigate('/')
        }
    }, [status])
  
    // // const [nameLegit, setNameLegit] = useState(false)
    // const [descLegit, setDescLegit] = useState(false)
    // const [addressLegit, setAddressLegit] = useState(false)
    // const [dateStartLegit, setDateStartLegit] = useState(false)
    // const [dateEndLegit, setDateEndLegit] = useState(false)
    // const [priceDayLegit, setPriceDayLegit] = useState(true)
    // const [pricePersonLegit, setPricePersonLegit] = useState(true)
    // const [maxPersonLegit, setMaxPersonLegit] = useState(true)
    // const [rulesLegit, setRulesLegit] = useState(false)
    // const [numBedsLegit, setNumBedsLegit] = useState(true)
    // const [numBedroomsLegit, setNumBedroomsLegit] = useState(true)
    // const [numBathroomsLegit, setNumBathroomsLegit] = useState(true)
    // const [typeLegit, setTypeLegit] = useState(false)
    // const [areaLegit, setAreaLegit] = useState(true)

    const createRoom = () => {

        setPressedOnce(true)

        if (nameLegit && descLegit && addressLegit && dateStartLegit && dateEndLegit &&
            priceDayLegit && pricePersonLegit && maxPersonLegit && rulesLegit && numBedsLegit &&
            numBedroomsLegit && numBathroomsLegit && typeLegit && areaLegit){
            APIService.createRoom(token['mytoken'], userid['userid'], name, desc, photo, position.lng, position.lat, address, transportation, dateStart, dateEnd, 
                priceDay, pricePerson, maxPerson, rules, numBeds, numBedrooms, numBathrooms, type, area, lr, wifi, ac, heating, stove, tv, parking, elevator)
            .then(resp => console.log(resp))
            .catch(error => console.log(error))

            navigate('/host/')
        }
        console.log('pressed')

    }

    const warnings = () => {

        let nameLegitWarning;
        let descLegitWarning;
        let addressLegitWarning;
        let dateStartLegitWarning;
        let dateEndLegitWarning;
        let priceDayLegitWarning;
        let pricePersonLegitWarning;
        let maxPersonLegitWarning;
        let rulesLegitWarning;
        let numBedsLegitWarning;
        let numBedroomsLegitWarning;
        let numBathroomsLegitWarning;
        let typeLegitWarning;
        let areaLegitWarning;

        if (pressedOnce){
            if (!nameLegit){
                nameLegitWarning = <div>! Name is a required field</div>;
            }
            if (!descLegit){
                descLegitWarning = <div>! Description is a required field</div>;
            }
            if (!addressLegit){
                addressLegitWarning = <div>! Address is a required field</div>;
            }
            if (!dateStartLegit){
                dateStartLegitWarning = <div>! Start Date is a required field</div>;
            }
            if (!dateEndLegit){
                dateEndLegitWarning = <div>! End Date is a required field</div>;
            }
            if (!priceDayLegit){
                priceDayLegitWarning = <div>! Price per day is a required field</div>;
            }
            if (!pricePersonLegit){
                pricePersonLegitWarning = <div>! Price per person is a required field</div>;
            }
            if (!maxPersonLegit){
                maxPersonLegitWarning = <div>! Max Num of people is a required field</div>;
            }
            if (!rulesLegit){
                rulesLegitWarning = <div>! Rules is a required field</div>;
            }
            if (!numBedsLegit){
                numBedsLegitWarning = <div>! Num of Beds is a required field</div>;
            }
            if (!numBedroomsLegit){
                numBedroomsLegitWarning = <div>! Num of Bedrooms is a required field</div>;
            }
            if (!numBathroomsLegit){
                numBathroomsLegitWarning = <div>! Num of Bathrooms is a required field</div>;
            }
            if (!typeLegit){
                typeLegitWarning = <div>! Type is a required field</div>;
            }
            if (!areaLegit){
                areaLegitWarning = <div>! Area is a required field</div>;
            }
        }

        return(
            <div className="text-danger mt-2">
                <b>
                    {nameLegitWarning}
                    {descLegitWarning}
                    {addressLegitWarning}
                    {dateStartLegitWarning}
                    {dateEndLegitWarning}
                    {priceDayLegitWarning}
                    {pricePersonLegitWarning}
                    {maxPersonLegitWarning}
                    {rulesLegitWarning}
                    {numBedsLegitWarning}
                    {numBedroomsLegitWarning}
                    {numBathroomsLegitWarning}
                    {typeLegitWarning}
                    {areaLegitWarning}
                </b>
            </div>
        )

    }

  return (
    <div className='container'>
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
            <div className='mb-3 bg-danger'>
                <p>Select the location of the house:</p>
                <MapContainer center={coordinates} zoom={12} style={{height: '500px'}}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                </MapContainer>
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
                <div className='col-lg-2 text-end'>
                    <label htmlFor='transportation' className='form-label'>Starting Date</label>
                </div>
                <div className='col-lg-2'>
                    <input type='date' className='form-control' value={dateStart} onChange={e => setDateStart(e.target.value)}/>
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
                <div className='col-lg-2 text-end'>
                    <label htmlFor='transportation' className='form-label'>End Date</label>
                </div>
                <div className='col-lg-2'>
                    <input type='date' className='form-control' value={dateEnd} onChange={e => setDateEnd(e.target.value)}/>
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
            <div className="row mt-5">
                <div className="col-lg-2 text-end"> 
                    <label htmlFor='type' className='form-label'>Main Photo</label>
                </div>
                <div className="col-lg-3">
                    <input type='file' className='form-control' onChange={(e) => setPhoto(e.target.files[0])}/>
                </div>
            </div>
        </div>
        <br/>
         
        <div className='text-end'>
            <button className='btn btn-success col-6' onClick={createRoom}>Create</button>
        </div>

        {warnings()}        
        

    </div>
  )
}

export default HostCreate