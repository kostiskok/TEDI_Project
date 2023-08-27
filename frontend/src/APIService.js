export default class APIService{

    static registerUser(body){
        return fetch('http://127.0.0.1:8000/airbnb/users/', {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)

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

    static getRooms(page, type, maxcost, lr, wifi, ac, heating, stove, tv, parking, elevator){

        var typeFilter = (type != "") ? `&type=${type}` : ""
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

}