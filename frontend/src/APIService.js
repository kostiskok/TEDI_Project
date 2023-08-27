export default class APIService{

    static registerUser(username, password, first_name, last_name, email, phone, isRenter, waitingHost){
        return fetch('http://127.0.0.1:8000/airbnb/users/', {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
            },
            // body:JSON.stringify(body)
            body:JSON.stringify({
                'username':username,
                'password':password,
                'first_name':first_name,
                'last_name':last_name,
                'email':email,
                'phone':phone,
                'isRenter':isRenter,
                'waitingHost':waitingHost,
                'isHost':false
            })

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

    static createRoom(token, id, name, desc, address, transportation, price_per_day, price_per_person, maxperson, rules, numbeds, numbedrooms, numbathrooms, type, area, lr, wifi, ac, heating, stove, tv, parking, elevator){

        return fetch(`http://127.0.0.1:8000/airbnb/rooms/`, {
            'method': 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
            body: JSON.stringify({
                'name':name,
                'desc':desc,
                'owner':id,
                'longitude':5,
                'latitude':5,
                'address':address,
                'transportation':transportation,
                'date_start':"2023-05-02",
                'date_end':"2023-05-02",
                'price_per_day':price_per_day,
                'price_per_person':price_per_person,
                'max_num_people':maxperson,
                'num_of_beds':numbeds,
                'num_of_bedrooms':numbedrooms,
                'num_of_bathrooms':numbathrooms,
                'room_type':type,
                'area':area,
                'living_room':lr,
                'wifi':wifi,
                'air_condition':ac,
                'heating':heating,
                'stove':stove,
                'television':tv,
                'parking':parking,
                'elevator':elevator
            }),
        }).then(resp => resp.json())

    }

}