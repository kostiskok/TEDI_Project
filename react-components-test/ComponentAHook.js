import React from 'react'
import ComponentBHook from './ComponentBHook'

function ComponentAHook() {
  return (
    <div>
        <h1>Component A</h1>
        <ComponentBHook />
    </div>
  )
}

export default ComponentAHook