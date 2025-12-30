import React from 'react'
import "./verify2fa.css"
import Button from '../components/button';

const verify2fa = () => {
  return (
    <div>
      <form className="verify-form">
        <input type="text" placeholder="enter 2fa code" />
        <button>verify</button>

      </form>
    </div>
  )
}

export default verify2fa
