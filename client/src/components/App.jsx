import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogin, userLogout, checkLoggedIn } from "../actions"
import { Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import DotLoader from 'react-spinners/DotLoader'
import { Route, Switch, Link, Redirect} from 'react-router-dom'
import {NotificationContainer} from 'react-notifications'

// CSS imports
import '../css/App.css'
import '../css/Games.css'
import "mdbreact/dist/css/mdb.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-notifications/lib/notifications.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { css } from "@emotion/core";

// Component imports
import { Login }  from './Login'
import { Signup } from './Signup'
import { Game } from './Game'
import { Games } from './Games'
import { AddGame } from './AddGame'

class _App extends React.Component {
  constructor(props) {
    super(props)
    this._userLogout = this._userLogout.bind(this)
  }

  componentDidMount(){
    var token = localStorage.getItem('token')
    var username = localStorage.getItem('username')

    if (token && username) {
      this.props.checkLoggedIn()
    }
  }
  
  _userLogout(){
    this.props.userLogout()
  }

  render() {

    const { user } = this.props
    console.log(user)
    const { game } = this.props

    let homeRedirect 
    let navbar

    if (!user.isLoggedIn && !user.isFetching) {
      // Import login component
      navbar =         
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Board At Home</Navbar.Brand>
        <Nav className="mr-auto"/>
        <Button
          href="#login"
        >Login</Button>
        <Button
          href="#signup"
        >Sign up</Button>
      </Navbar>
      homeRedirect = <Redirect from='/' to='/login'/>
    }

    if (user.isLoggedIn) {
      navbar =
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Board At Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#games">Games</Nav.Link>
          </Nav>
          <Button
            onClick={() => {
              this._userLogout()
            }}
          >Logout</Button>
      </Navbar>
      
      homeRedirect = <Redirect from='/' to='/games'/>
    }

    if (user.isFetching) {
      // Add a loading icon
      navbar =         
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Board At Home</Navbar.Brand>
        </Navbar>
    }

    return (
      <div className="main-wrapper">
        <div className="App">
          <NotificationContainer key="app"/>
          {navbar}
            <Switch>
              <Route path='/login'><Login/></Route>
              <Route path='/signup'><Signup/></Route>
              <Route path='/games'><Games/></Route>
              <Route path="/gamesAdd"><AddGame/></Route>
              <Route path='/game'><Game/></Route>
              {homeRedirect}
            </Switch> 
        </div>
      </div>
    );
  }
}

// Connect state and imported functions to Redux Store
// connect(states, dispatch functions)
export const App = connect(state => {
  const { user } = state
  const { game } = state 
  return { user, game}

  // bindActionCreators turns an object whose values are action creators, into an object with the same keys, 
  // but with every action creator wrapped into a dispatch call so they may be invoked directly.
}, dispatch => {
  return bindActionCreators({
    userLogin, userLogout, checkLoggedIn
  }, dispatch)
})(_App)

