import React, { useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import CardsComponent from '../Cards/CardsComponent.js'
import Decks from '../Decks/DecksComponent.js'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute.js'
import SignUp from '../SignUp/SignUp.js'
import SignIn from '../SignIn/SignIn.js'
import SignOut from '../SignOut/SignOut.js'
import ChangePassword from '../ChangePassword/ChangePassword.js'
import Home from '../shared/Home.js'
import NewDeck from '../Decks/NewDeck.js'

const App = props => {
  const [user, setUser] = useState(null)
  const [alerts, setAlerts] = useState([])

  const clearUser = () => {
    setUser(null)
  }

  const alertSetter = ({ heading, message, variant }) => {
    setAlerts({ alerts: [...alerts, { heading, message, variant }] })
  }

  return (
    <div style={{ backgroundColor: 'gray' }}>
      <div>
        <h3>{props.location.state ? props.location.state.msg : null}</h3>
        <main className="container" >
          <Route exact path='/' render={() => (
            <Home
              user={user}
              alert={alertSetter}
              setUser={setUser}
            />
          )} />
          <Route exact path='/cards' render={() => (
            <CardsComponent
              user={user}
            />
          )} />
          <Route exact path='/decks' render={() => (
            <Decks
              user={user}
            />
          )} />
          <Route exact path ='/new-deck' render={(props) => (
            <NewDeck
              user={user}
            />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={alertSetter} setUser={setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={alertSetter} setUser={setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={alertSetter} clearUser={clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={alertSetter} user={user} />
          )} />
        </main>
      </div>
    </div>
  )
}

export default withRouter(App)

// class App extends Component {
//   constructor () {
//     super()
//
//     this.state = {
//       user: null,
//       alerts: []
//     }
//   }
//
//   setUser = user => this.setState({ user })
//
//   clearUser = () => this.setState({ user: null })
//
//   alert = ({ heading, message, variant }) => {
//     this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
//   }
//
//   render () {
//     const { alerts, user } = this.state
//
//     return (
//       <Fragment>
//         <Header user={user} />
//         {alerts.map((alert, index) => (
//           <AutoDismissAlert
//             key={index}
//             heading={alert.heading}
//             variant={alert.variant}
//             message={alert.message}
//           />
//         ))}
//         <main className="container">
//           <Route path='/sign-up' render={() => (
//             <SignUp alert={this.alert} setUser={this.setUser} />
//           )} />
//           <Route path='/sign-in' render={() => (
//             <SignIn alert={this.alert} setUser={this.setUser} />
//           )} />
//           <AuthenticatedRoute user={user} path='/sign-out' render={() => (
//             <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
//           )} />
//           <AuthenticatedRoute user={user} path='/change-password' render={() => (
//             <ChangePassword alert={this.alert} user={user} />
//           )} />
//         </main>
//       </Fragment>
//     )
//   }
// }
