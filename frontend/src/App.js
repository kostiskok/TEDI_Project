import React, {useState, useEffect} from "react";
import './App.css';
// import ArticleList from './components/ArticleList';
// import Form from './components/Form';
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";
import APIService from "./APIService";

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
    const [userid] = useCookies(['userid'])

    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [maxPerson, setMaxPerson] = useState(2)
    const [isLogged, setLogged] = useState(false)

    //State and function for the OpenStreet Map
    const [position, setPosition] = useState(null)

    const [recommended, setRecommended] = useState([])
    const [rooms, setRoom] = useState([])
    const [reviews, setReviews] = useState([])
    const [users, setUsers]= useState([])

    useEffect(() => {
        if(token['mytoken']){
            setLogged(true)
        }
        else{
        setLogged(false)
        }
    }, [token])

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch users, reviews, and recommendations concurrently using Promise.all
            const [usersResp, reviewsResp, recommendedResp] = await Promise.all([
              APIService.getUsers(),
              APIService.getReviewDetails(),
              APIService.getRecommendations(userid['userid']),
            ]);
    
            setUsers(usersResp);
            setReviews(reviewsResp);
            setRecommended(recommendedResp);
    
            // Fetch rooms based on recommended data
            const roomPromises = recommendedResp.slice(0, 6).map((recommendation) => {
              return APIService.getRoom(recommendation);
            });
    
            const allRoomsData = await Promise.all(roomPromises);
            setRoom(allRoomsData);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);

    console.log(userid['userid'])


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

  return (
    // isLoading ? (
    //     <p>Loading...</p>
    //   ) : (
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
            <h2>Scroll down for some recommended rooms for you:</h2>
            <div className="row row-cols-3">
                {rooms && rooms.map((item, index) => (
                <div className="col mb-5" key={item.id}>
                    <div className="card"> 
                        <div className="card-body bg-light">
                        {/* {console.log("Room Item :", item)} */}
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
                                                <h4> {review.count === 0 ? <div>No Score Yet</div> : <div>{(review.average/2).toFixed(2)}/5 stars</div>}</h4>
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
            
        </div>
        // )
    );
}


export default App;
