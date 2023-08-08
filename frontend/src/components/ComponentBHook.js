import React, {useContext} from 'react'
import { MyContext } from '../App'

function ComponentBHook() {

    const data = useContext(MyContext)

  return (
    <div>
        <h2>Component B</h2>

        <p>{data}</p>
    </div>
  )
}

export default ComponentBHook