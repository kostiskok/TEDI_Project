import React, {useState, useEffect} from "react";
import './App.css';
// import ArticleList from './components/ArticleList';
// import Form from './components/Form';
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";

// Stuff needed for Openstreet Map / leaflet
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMapEvents, Marker} from 'react-leaflet';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
const coordinates = [37.9708, 23.7261]; //Athens coordinates

function App() {

    const [token] = useCookies(['mytoken'])

    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [maxPerson, setMaxPerson] = useState(2)
    const [isLogged, setLogged] = useState(false)

    //State and function for the OpenStreet Map
    const [position, setPosition] = useState(null)

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
    useEffect(() => {
        if(token['mytoken']){
            setLogged(true)
        }
        else{
        setLogged(false)
        }
    }, [token])

  return (
    <div className="container">
    
        <div className="bg-primary p-4 text-warning rounded">
            <b>Search</b>
        </div>
        <div className="bg-light p-4">

            <div className="container">
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <p>Select a location close to where you're looking for:</p>
                        <MapContainer center={coordinates} zoom={12} style={{height: '500px'}}>
                            <TileLayer
                                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker />
                        </MapContainer>
                    </div>
                </div>
                <div className="row mb-3">

                    <div className='col-lg-2 text-end'>
                        <label htmlFor='transportation' className='form-label'>Starting Date</label>
                    </div>
                    <div className='col-lg-2'>
                        <input type='date' className='form-control' value={dateStart} onChange={e => setDateStart(e.target.value)}/>
                    </div>
                    <div className='col-lg-1 text-end'>
                        <label htmlFor='transportation' className='form-label'>End Date</label>
                    </div>
                    <div className='col-lg-2'>
                        <input type='date' className='form-control' value={dateEnd} onChange={e => setDateEnd(e.target.value)}/>
                    </div>
                        <div className='col-lg-3 text-end'>
                        <label htmlFor='maxperson' className='form-label'>Max number of people:</label>
                    </div>
                    <div className='col-lg-2'>
                        <input type='number' className='form-control' id='maxperson'
                        value = {maxPerson} onChange={e => setMaxPerson(e.target.value)}/>
                    </div>

                </div>
                <div className="row">
                    <div className='text-end'>
                        <Link className='btn btn-success btn-lg col-6' role="button" 
                        to="/rooms" state={{maxPerson: maxPerson, pos: position, dateStart: dateStart, dateEnd: dateEnd}}>Search</Link>
                    </div>
                </div>
            </div>

        </div>
        {isLogged
            ?
            <div className="bg-light p-4 mt-4">
                <h2>Recommended Rooms logged in</h2>
                <div className="row">
                    {/* Map your recommended rooms data here */}
                </div>
            </div>
            :(
            <div className="bg-light p-4 mt-4">
                <h2>Recommended Rooms logged out</h2>
                <div className="row">
                    {/* Map your recommended rooms data here */}
                </div>
            </div>
            )
        }
        
    </div>
  );
}


export default App;
