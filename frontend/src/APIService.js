export default class APIService{

    static registerUser(username, password, photo, first_name, last_name, email, phone, isRenter, waitingHost){

        const data = new FormData();
        data.append('username', username);
        data.append('password', password);
        if (photo != null){
            data.append('photo', photo)
        }
        data.append('first_name', first_name);
        data.append('last_name', last_name);
        data.append('email', email);
        data.append('phone', phone);
        data.append('isRenter', isRenter);
        data.append('waitingHost', waitingHost);

        return fetch('http://127.0.0.1:8000/airbnb/users/', {
            'method':'POST',
            body: data

        }).then(resp => resp.json())
    }

    static loginUser(body){
        return fetch('http://127.0.0.1:8000/auth/', {
            'method': 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static getUsers(){
        return fetch('http://127.0.0.1:8000/airbnb/users', {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        }).then(resp => resp.json())
    }

    static getUser(id){
        return fetch(`http://127.0.0.1:8000/airbnb/users/${id}`, {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        }).then(resp => resp.json())
    }

    static approveHostUser(id, token){
        return fetch(`http://127.0.0.1:8000/airbnb/users/${id}/`, {
            'method': 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
            body : JSON.stringify({
                'waitingHost':false,
                'isHost':true,
            })
        })
    }

    static updateUser(id, first_name, last_name, email, phone, token){

        const data = new FormData();
        data.append('first_name', first_name);
        data.append('last_name', last_name);
        data.append('email', email);
        data.append('phone', phone);
        return fetch(`http://127.0.0.1:8000/airbnb/users/${id}/` , {
            'method': 'PATCH',
            headers: {
                'Authorization':`Token ${token}`
            },
            body: data
        }).then(resp => console.log(resp))
    }

    static updateRoom(id,num_of_beds,num_of_bathrooms,room_type,num_of_bedrooms,living_room,wifi,air_condition,heating,stove,television,parking,elevator,desc,rules,area,token){

        const data = new FormData();
        data.append('num_of_beds', num_of_beds);
        data.append('num_of_bathrooms', num_of_bathrooms);
        data.append('room_type', room_type);
        data.append('num_of_bedrooms', num_of_bedrooms);
        data.append('living_room', living_room);
        data.append('wifi', wifi);
        data.append('air_condition', air_condition);
        data.append('heating', heating);
        data.append('stove', stove);
        data.append('television', television);
        data.append('parking', parking);
        data.append('elevator', elevator);
        data.append('desc', desc);
        data.append('rules', rules);
        data.append('area',area);
        return fetch(`http://127.0.0.1:8000/airbnb/rooms/${id}/` , {
            'method': 'PATCH',
            headers: {
                'Authorization':`Token ${token}`
            },
            body: data
        }).then(resp => console.log(resp))
    }

    static getRooms(page, maxPerson, position, dateStart, dateEnd, type, maxcost, lr, wifi, ac, heating, stove, tv, parking, elevator){

        var maxPersonFilter = (maxPerson !== "" && maxPerson !== null) ? `&people=${maxPerson}` : ""
        var latFilter = (position !== "" && position !== null) ? `&lat=${Number(position.lat).toFixed(6)}` : ""
        var longFilter = (position !== "" && position !== null) ? `&lon=${Number(position.lng).toFixed(6)}` : ""
        var dateStartFilter = (dateStart !== "" && dateStart !== null) ? `&dateStart=${dateStart}` : ""
        var dateEndFilter = (dateEnd !== "" && dateEnd !== null) ? `&dateEnd=${dateEnd}` : ""

        var typeFilter = (type !== "") ? `&type=${type}` : ""
        var maxCostFilter = (maxcost) ? `&maxcost=${maxcost}` : ""
        var lrFilter = (lr) ? "&lr" : ""
        var wifiFilter = (wifi) ? "&wifi" : ""
        var acFilter = (ac) ? "&ac" : ""
        var heatingFilter = (heating) ? "&heating" : ""
        var stoveFilter = (stove) ? "&stove" : ""
        var tvFilter = (tv) ? "&tv" : ""
        var parkingFilter = (parking) ? "&parking" : ""
        var elevatorFilter = (elevator) ? "&elevator" : ""

        return fetch(`http://127.0.0.1:8000/airbnb/rooms/?page=${page}${maxPersonFilter}${latFilter}${longFilter}${dateStartFilter}${dateEndFilter}${typeFilter}${maxCostFilter}${lrFilter}${wifiFilter}${acFilter}${heatingFilter}${stoveFilter}${tvFilter}${parkingFilter}${elevatorFilter}`, {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        }).then(resp => resp.json())
    }

    static getRoom(id){
        return fetch(`http://127.0.0.1:8000/airbnb/rooms/${id}`, {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        }).then(resp => resp.json())
    }

    static getAllRooms(){
        return fetch(`http://127.0.0.1:8000/airbnb/rooms/`, {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        }).then(resp => resp.json())
    }

    static checkRoom(id, dateStart, dateEnd){

        return fetch(`http://127.0.0.1:8000/airbnb/rooms/?id=${id}&dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        })
        .then(resp => resp.json())

    }

    static hostRooms(token){
        return fetch(`http://127.0.0.1:8000/airbnb/roomhost/`, {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        }).then(resp => resp.json())
    }

    static adminRooms(token){
        return fetch(`http://127.0.0.1:8000/airbnb/roomadmin/`, {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        }).then(resp => resp.json())
    }

    static createRoom(token, id, name, desc, photo, long, lat, address, transportation, dateStart, dateEnd, price_per_day, price_per_person, 
        maxperson, rules, numbeds, numbedrooms, numbathrooms, type, area, lr, wifi, ac, heating, stove, tv, parking, elevator){

        const data = new FormData();
        data.append('name', name);
        data.append('desc', desc);
        if (photo != null){
            data.append('photo', photo)
        }
        data.append('owner', id);
        data.append('longitude', Number(long).toFixed(6));
        data.append('latitude', Number(lat).toFixed(6));
        data.append('address', address);
        data.append('transportation', transportation);
        data.append('date_start', dateStart);
        data.append('date_end', dateEnd);
        data.append('price_per_day', price_per_day);
        data.append('price_per_person', price_per_person);
        data.append('max_num_people', maxperson);
        data.append('rules', rules);
        data.append('num_of_beds', numbeds);
        data.append('num_of_bedrooms', numbedrooms);
        data.append('num_of_bathrooms', numbathrooms);
        data.append('room_type', type);
        data.append('area', area);
        data.append('living_room', lr);
        data.append('wifi', wifi);
        data.append('air_condition', ac);
        data.append('heating', heating);
        data.append('stove', stove);
        data.append('television', tv);
        data.append('parking', parking);
        data.append('elevator', elevator);

        return fetch(`http://127.0.0.1:8000/airbnb/rooms/`, {
            'method': 'POST',
            headers: {
                'Authorization':`Token ${token}`
            },
            body : data
        }).then(resp => resp.json())

    }

    static getReviews(){
        return fetch('http://127.0.0.1:8000/airbnb/reviews', {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        }).then(resp => resp.json())
    }

    static getReviewDetails(){
        return fetch('http://127.0.0.1:8000/airbnb/details', {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        }).then(resp => resp.json())
    }

    static getReviewsByRenter(id){
        return fetch(`http://127.0.0.1:8000/airbnb/reviews?id=${id}`, {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        }).then(resp => resp.json())
    }

    static getReviewsByHost(host){
        return fetch(`http://127.0.0.1:8000/airbnb/reviews?host=${host}`, {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        }).then(resp => resp.json())
    }

    static getReviewsByRoom(id){
        return fetch(`http://127.0.0.1:8000/airbnb/reviews?room=${id}`, {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        }).then(resp => resp.json())
    }

    static addReview(user,room,score,review_text,date,token){
        const data = new FormData();
        data.append('user', user);
        data.append('room', room);
        data.append('score', score);
        data.append('review_text', review_text);
        data.append('date', date);

        return fetch(`http://127.0.0.1:8000/airbnb/reviews/`, {
            'method': 'POST',
            headers: {
                'Authorization':`Token ${token}`
            },
            body : data
        }).then(resp => resp.json())
    }

    static getBookings(){
        return fetch('http://127.0.0.1:8000/airbnb/bookings', {
            headers: {
                'Content-Type': 'application/xml',
            },
        }).then(resp => resp.text())
    } 

    static addBooking(renter, room_id, dateStart, dateEnd, token){
        const data = new FormData();
        data.append('renter', renter)
        data.append('room_id', room_id)
        data.append('date_start', dateStart)
        data.append('date_end', dateEnd)

        return fetch(`http://127.0.0.1:8000/airbnb/bookings/`, {
            method: 'POST',
            headers: {
                'Authorization':`Token ${token}`
            },
            body: data
        }).then(resp => resp.json()) 
    }

    static getRecommendations(id) {
        const url = id ? `http://127.0.0.1:8000/airbnb/recommendation/${id}` : 'http://127.0.0.1:8000/airbnb/recommendation';
        return fetch(url, {
            headers: {
                'Content-Type': 'application/xml',
            },
        }).then(resp => resp.json());
    }

    // XML Requests
    static adminRoomsXML(token){
        return fetch(`http://127.0.0.1:8000/airbnb/roomxml/`, {
            headers: {
                'Content-Type': 'application/xml',
                'Authorization':`Token ${token}`,
            },
        }).then(resp => resp.text())
    }

    static getBookingsXML(){
        return fetch('http://127.0.0.1:8000/airbnb/bookingsxml', {
            headers: {
                'Content-Type': 'application/xml',
            },
        }).then(resp => resp.text())
    } 

    static getReviewsByRenterXML(id){
        return fetch(`http://127.0.0.1:8000/airbnb/reviewsxml?id=${id}`, {
            headers: {
                'Content-Type': 'application/xml',
            },
        }).then(resp => resp.text())
    }

    static getReviewsByHostXML(host){
        return fetch(`http://127.0.0.1:8000/airbnb/reviewsxml?host=${host}`, {
            headers: {
                'Content-Type': 'application/xml',
            },
        })
        .then(resp => resp.text())
    }

}