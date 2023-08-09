export default class APIService{

    static updateArticle(article_id, body, token){
        return fetch(`http://127.0.0.1:8000/airbnb/tests/${article_id}/`,{
            'method':'PUT',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
            body:JSON.stringify(body)
        }).then(resp => resp.json())

    }

    static insertArticle(body, token){
        return fetch('http://127.0.0.1:8000/airbnb/tests/', {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
            body:JSON.stringify(body)

        }).then(resp => resp.json())

    }
    
    static deleteArticle(article_id, token){
        return fetch(`http://127.0.0.1:8000/airbnb/tests/${article_id}/`,{
            'method':'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
    }

    static loginUser(body){
        return fetch('http://127.0.0.1:8000/auth/', {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)

        }).then(resp => resp.json())

    }

    static registerUser(body){
        return fetch('http://127.0.0.1:8000/airbnb/users/', {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)

        }).then(resp => resp.json())

    }

}