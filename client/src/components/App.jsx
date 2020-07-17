import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogin, userLogout } from "../actions"
import { Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import DotLoader from 'react-spinners/DotLoader'
import 'bootstrap/dist/css/bootstrap.min.css'
import { css } from "@emotion/core";

import '../css/App.css'

import { Login }  from './Login'
import { Game } from './Game'


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
    let body = <div className="blank"/>
    let navbar = <div className="blank"/>

    if (!user.isLoggedIn && !user.isFetching) {
      // Import login component
      navbar =         
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Board At Home</Navbar.Brand>
      </Navbar>
      body = <Login/>
      // Login can invoke userLogin() with parameters
    }

    if (user.isLoggedIn) {
      navbar =
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Board At Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#features">Games</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
      </Navbar>
      body = <div className='Game'><Game/></div>
    }

    if (user.isFetching) {
      // Add a loading icon
      navbar =         
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Board At Home</Navbar.Brand>
        </Navbar>
      body = <DotLoader/>
    }

    else if (user.isReceived && user.isLoggedIn) {
      // Import UserProfile component
      // body = <UserProfile/>
    }

    else if (user.error !== null && !user.isLoggedIn) {
      // Display error message for logging in
      // Call a function/add component to show error and reprompt for login
      body = <p>{user.error}</p>
    }

    return (
      <div className="App">
        {navbar}
        {body}
      </div>
    );
  }
}

// Connect state and imported functions to Redux Store
// connect(states, dispatch functions)
export const App = connect(state => {
  const { user } = state
  // const { game } = state 
  return { user /*, game */}

  // bindActionCreators turns an object whose values are action creators, into an object with the same keys, 
  // but with every action creator wrapped into a dispatch call so they may be invoked directly.
}, dispatch => {
  return bindActionCreators({
    userLogin, userLogout
  }, dispatch)
})(_App)

