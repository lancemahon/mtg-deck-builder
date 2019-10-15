import React, { useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import CardsComponent from '../Cards/CardsComponent.js'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute.js'
import SignUp from '../SignUp/SignUp.js'
import SignIn from '../SignIn/SignIn.js'
import SignOut from '../SignOut/SignOut.js'
import ChangePassword from '../ChangePassword/ChangePassword.js'

const App = props => {
  const [user, setUser] = useState(null)
  const [alerts, setAlerts] = useState([])

  const clearUser = () => {
    setUser(null)
  }

  const alertSetter = ({ heading, message, variant }) => {
    setAlerts({ alerts: [...alerts, { heading, message, variant }] })
  }

  // const alert = ({ heading, message, variant }) => {
  //   setAlerts({ alerts: [...this.state.alerts, { heading, message, variant }] })
  // }

  return (
    <div>
      <div>
        <h3>{props.location.state ? props.location.state.msg : null}</h3>
        <Route exact path='/cards' component={CardsComponent} />
      </div>
      <div>
        <main className="container">
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
