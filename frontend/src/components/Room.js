import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom'
import { useCookies } from "react-cookie";
import APIService from "../APIService";

function Room() {

    const { id } = useParams()

    const [room, setRoom] = useState([])
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogged, setLogged] = useState(false)
    const [user, setUser] = useState([])
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [bookingResult, setBookingResult] = useState(null)
    const roomTypeMapping = {
      'p': 'Private',
      'h': 'House',
      's': 'Share',
    };
    const [review, setReview] = useState({
      comment: "",
      rating: 5, // Default rating
    });

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;

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
      APIService.getRoom(id)
        .then(resp => setRoom(resp))
        .catch(error => console.log(error))
    }, [])

    useEffect(() => {
      APIService.getUser(token.userid)
        .then(resp => setUser(resp))
        .catch(error => console.log(error))
    }, [])


    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setReview((prevReview) => ({
        ...prevReview,
        [name]: value,
      }));
    };
  
    const handleRatingChange = (event) => {
      const { name, value } = event.target;
      setReview((prevReview) => ({
        ...prevReview,
        [name]: parseInt(value, 10),
      }));
    };
    
    const ReviewBtn = () => {
      APIService.addReview(user.username,room.name,review.rating,review.comment,formattedDate,token['mytoken'])
    };

    const handleCheckDates = () => {
      if (dateStart && dateEnd) {
        // Check if you can book the room during those days
        const isValidBooking = true;
  
        if (isValidBooking) {
          setBookingResult("Booking is available!");
        } else {
          setBookingResult("Booking is not available for the selected dates.");
        }
      } else {
        setBookingResult("Please select both start and end dates.");
      }
    };

  return (
    <div className='container pt-3'>
    <h1>Room {id}</h1><hr />
        <div className='mb-3' key={id}>
          <div className='row'>
            <div className='col-lg-4'>
              <b>Room photos will be here</b>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
            <p style={{ fontSize: '24px',textDecoration: 'underline' }}> <b> Room information:</b> </p>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
              <b>Number of beds:</b> {room.num_of_beds} <br />
              <b>Number of bathrooms:</b> {room.num_of_bathrooms} <br />
              <b>Type of rented space:</b> {roomTypeMapping[room.room_type]} <br />
              <b>Number of bedrooms:</b> {room.num_of_bedrooms} <br />
              <b>Living room:</b> {room.living_room} <br />
              <b>Space area:</b> {room.area} <br />
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
            <p style={{ fontSize: '24px',textDecoration: 'underline' }}> <b> Room description:</b> </p>
            {room.desc}
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
            <p style={{ fontSize: '24px',textDecoration: 'underline' }}> <b> Renting rules:</b> </p>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
              {room.rules}
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
            <p style={{ fontSize: '24px',textDecoration: 'underline' }}> <b> Host information:</b> </p>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
              <b>Photo of owner here:</b> <br />
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
            <p style={{ fontSize: '24px',textDecoration: 'underline' }}> <b> Reviews:</b> </p>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
              <b>Reviews will be here</b> <br />
            </div>
          </div>

          <div className="row">
          <div className="col-lg-4">
            <h3>Write your review for this room</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="comment">Comment:</label>
                <textarea
                  className="form-control"
                  id="comment"
                  name="comment"
                  value={review.comment}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="rating">Rating:</label>
                <select
                  className="form-control"
                  id="rating"
                  name="rating"
                  value={review.rating}
                  onChange={handleRatingChange}
                  required
                >
                  <option value="5">5 stars</option>
                  <option value="4">4 stars</option>
                  <option value="3">3 stars</option>
                  <option value="2">2 stars</option>
                  <option value="1">1 star</option>
                </select>
              </div>
              <button onClick={ReviewBtn} className="btn btn-primary">Post review</button>
            </form>
          </div>
        </div>



          <div className='row'>
            <div className='col-lg-4'>
            <p style={{ fontSize: '24px',textDecoration: 'underline' }}> <b> Rent this room:</b> </p>
            </div>
          </div>

          <div className="row mb-3">
            <div className='col-lg-1. '>
                <label htmlFor='transportation' className='form-label'>Starting Date</label>
            </div>
            <div className='col-lg-2'>
                <input type='date' className='form-control' value={dateStart} onChange={e => setDateStart(e.target.value)}/>
            </div>
            <div className='col-lg-1.'>
                <label htmlFor='transportation' className='form-label'>End Date</label>
            </div>
            <div className='col-lg-2'>
                <input type='date' className='form-control' value={dateEnd} onChange={e => setDateEnd(e.target.value)}/>
            </div>
            <div className='col-lg-2'>
              <button className="btn btn-primary" onClick={handleCheckDates}>Check Dates</button>
            </div>
          </div>

          {bookingResult && (
          <div className="row">
            <div className="col-lg-6">
              <p>{bookingResult}</p>
            </div>
          </div>

          //Add another button here that pops up when the room is available to confirm the booking and update the database
        )}

          <br />
        </div>
  </div>
  )
}

export default Room