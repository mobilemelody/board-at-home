import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogin, userLogout } from "../actions"
import { Nav, Navbar } from 'react-bootstrap'
import DotLoader from 'react-spinners/DotLoader'
import { Route } from 'react-router-dom'
import {NotificationContainer} from 'react-notifications'

import 'bootstrap/dist/css/bootstrap.min.css'
// import { css } from "@emotion/core";

// CSS imports
import '../css/App.css'
import '../css/Games.css'
import "mdbreact/dist/css/mdb.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-notifications/lib/notifications.css';

import { Login }  from './Login'
import { Game } from './Game'
import { Games } from './Games'
import {AddGame} from './AddGame'


class _App extends React.Component {
  constructor(props) {
    super(props)
    this._userLogout = this._userLogout.bind(this)
  }

  componentDidMount(){
    // Add method to check if user is already logged in by checking token in localStorage
  }

  _userLogout(){
    this.props.userLogout()
  }

  render() {

    const { user } = this.props
    const { game } = this.props

    let body = <div className="blank"/>
    let navbar = <div className="blank"/>

    if (!user.isLoggedIn && !user.isFetching) {
      // Import login component
      navbar =
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Board At Home</Navbar.Brand>
      </Navbar>
      body = <Login/>
    }

    if (user.isLoggedIn) {
      navbar =
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Board At Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#features">Games</Nav.Link>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form> */}
      </Navbar>

      if (game.isSet) {
        body = <div className='Game'><Game/></div>
      } else {
        body = <div className='Games'><Games/></div>
      }
    }

    if (user.isFetching) {
      // Add a loading icon
      navbar =
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Board At Home</Navbar.Brand>
        </Navbar>
      body = <DotLoader/>
    }

    else if (user.error !== null && !user.isLoggedIn) {
      // Display error message for logging in
      // Call a function/add component to show error and reprompt for login
      body = <p>{user.error}</p>
    }

    return (
      <div className="App">
        <NotificationContainer key="app"/>
        {navbar}
        <Route path='/games/add'><AddGame/></Route>
        {body}
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
    userLogin, userLogout
  }, dispatch)
})(_App)

