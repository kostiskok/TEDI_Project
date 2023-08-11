import React, {useState, useEffect} from 'react'

function CounterHook() {

    const [count, setCount] = useState(0)
    const [text, setText] = useState("This is a text")
    const [info, setInfo] = useState({name:'', email:''})
    const [articles, setArticles] = useState(['Article 1', 'Article 2', 'Article 3'])


    const addArticle = () => {
        setArticles([...articles, 'New article'])
    }

    // This is similar to ComponentDidMount
    // useEffect(() => {
    //     console.log("use effect is called")
    // }, [])

    // useEffect(() => {
    //     console.log("use effect is called")
    // }, [count, text])

    useEffect(() => {
        console.log("use effect is called")
        document.title = `You have clicked ${count} times`
    })

  return (
    <div>
        <h2>{count}</h2>
        <button onClick={() => setCount(count+1)} className='btn btn-primary'>Click me too</button>

        <h2>{text}</h2>
        <button onClick={() => setText("The text is changed")} className='btn btn-success'>Change text</button>

        <br/>
        <br/>
        <input type="text" className='form-control' value={info.name}
            onChange={e => setInfo({...info, name:e.target.value})}
        />
        <input type="text" className='form-control' value={info.email}
            onChange={e => setInfo({...info, email:e.target.value})}
        />


        <h2>Name is : {info.name}</h2>
        <h2>Email is : {info.email}</h2>

        <br/>
        <br/>

        {articles.map(article => {
            return <h2 key={article}>{article}</h2>
        })}

        <button onClick={addArticle} className='btn btn-primary'>Add article</button>

        <button onClick = {() => setCount(count+1)} className='btn btn-primary'>Change Title</button>

    </div>
  )
}

export default CounterHook