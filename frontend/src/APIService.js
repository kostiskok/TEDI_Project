export default class APIService{

    static registerUser(username, password, photo, first_name, last_name, email, phone, isRenter, waitingHost){

        const data = new FormData();
        data.append('username', username);
        data.append('password', password);
        data.append('photo', photo);
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
        fetch(`http://127.0.0.1:8000/airbnb/users/${id}/`, {
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

    static getRooms(page, type, maxcost, lr, wifi, ac, heating, stove, tv, parking, elevator){

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

        return fetch(`http://127.0.0.1:8000/airbnb/rooms/?page=${page}${typeFilter}${maxCostFilter}${lrFilter}${wifiFilter}${acFilter}${heatingFilter}${stoveFilter}${tvFilter}${parkingFilter}${elevatorFilter}`, {
            'method': 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        }).then(resp => resp.json())
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

    static createRoom(token, id, name, desc, photo, long, lat, address, transportation, dateStart, dateEnd, price_per_day, price_per_person, 
        maxperson, rules, numbeds, numbedrooms, numbathrooms, type, area, lr, wifi, ac, heating, stove, tv, parking, elevator){

        const data = new FormData();
        data.append('name', name);
        data.append('desc', desc);
        data.append('photo', photo)
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

}