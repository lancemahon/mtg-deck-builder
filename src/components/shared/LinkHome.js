import React from 'react'
import { Link } from 'react-router-dom'

const LinkHome = () => {
  return (
    <React.Fragment>
      <h6>Return to home page</h6>
      <Link to='/' type="button">Back</Link>
    </React.Fragment>
  )
}

export default LinkHome
