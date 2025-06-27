import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

function Logo({width=100}) {
  return (
    <div>
      <Link to="/">
      <img src={logo} alt="" width={100} />
      </Link>
    </div>
  )
}

export default Logo