import React from 'react'
import { Link } from 'react-router-dom'
import SignIn from '../SignIn/SignIn.js'
import SignUp from '../SignUp/SignUp.js'

const Home = (props) => {
  return (
    <React.Fragment>
      <h1>Welcome to MTG Deck Builder</h1>
      { props.user
        ? <span>
          <Link to='/cards' type="button">Search cards</Link>
          <Link to='/new-deck' type="button">New deck</Link>
        </span>
        : <span>
          <span>
            <h4>New user? Sign up here!</h4>
            <SignUp
              alert={props.alert}
              setUser={props.setUser}
            />
          </span>
          <span>
            <h4>Already have an account? Sign in here!</h4>
            <span>
              <SignIn
                alert={props.alert}
                setUser={props.setUser}
              />
            </span>
          </span>
        </span>
      }
    </React.Fragment>
  )
}

export default Home
