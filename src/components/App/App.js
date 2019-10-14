import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import CardsComponent from '../Cards/CardsComponent.js'
import Background from '../shared/Background.js'

const App = props => (
  <React.Fragment>
    <h3>{props.location.state ? props.location.state.msg : null}</h3>
    <Route path='/' component={Background} />
    <Route exact path='/cards' component={CardsComponent} />
  </React.Fragment>
)

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
