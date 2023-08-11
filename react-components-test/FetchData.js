import React, {useState, useEffect} from 'react'
import axios from 'axios'

function FetchData() {

    const [article, setArticle] = useState([])
    const [id, SetId] = useState(1)

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(resp => {
            console.log(resp.data)
            setArticle(resp.data)
        })
        .catch(error => console.log(error))
    }, [id])


  return (
    <div>

        {/* {articles.map(article => (
            <p key={article.id}>{article.title}</p>
            ))} */}

        <input type="text" value = {id} onChange={e => SetId(e.target.value)}/>
        <h3>{article.title}</h3>

    </div>
  )
}

export default FetchData