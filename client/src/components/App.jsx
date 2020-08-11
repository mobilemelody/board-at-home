// React, Redux imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch, Redirect } from 'react-router-dom'
// Action imports
import { userLogin, userLoading, userReset, checkLoggedIn, userUnsetIsNew, resetCollection } from "../actions"
// Component imports
import { Login } from './Login'
import { Signup } from './Signup'
import { Game } from './Game'
import { Games } from './Games'
import { AddGame } from './AddGame'
import { Collection } from './Collection'
import { UserProfile } from './UserProfile'
import { Recommendations } from './Recommendations'
import { EditUserProfile } from './EditUserProfile'
// Other imports
import Button from '@material-ui/core/Button';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { NotificationContainer } from 'react-notifications'
// CSS imports
import "mdbreact/dist/css/mdb.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-notifications/lib/notifications.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

// ------------------------------------
// App Class 
// Entry component for application
// ------------------------------------
class _App extends React.Component {
  constructor(props) {
    super(props)
    this._userLogout = this._userLogout.bind(this)
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('userID')

    // check if previous session in localStorage
    if (token && id) {
      this.props.userLoading()
      this.props.checkLoggedIn()
    } else {
      this.props.userUnsetIsNew()
    }
  }

  _userLogout() {
    this.props.userReset()
  }

  render() {
    const { user } = this.props

    let homeRedirect
    let navbar

    if (user.error != null) {
      this.resetCollection()
      this._userLogout()
    }

    if(user.isNew || user.isFetching) {
      navbar = 
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Board At Home</Navbar.Brand>
          <Nav className="mr-auto" />
        </Navbar>
    }

    else if (!user.isLoggedIn && !user.isFetching) {
      // Import login component
      navbar =
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Board At Home</Navbar.Brand>
          <Nav className="mr-auto" />
          <Button
            variant="contained"
            href="#login"
            className="mr-2"
          >Login</Button>
          <Button
            variant="contained"
            href="#signup"
          >Sign up</Button>
        </Navbar>
      homeRedirect = <Redirect from='/' to='/login' />
    }

    else if (user.isLoggedIn) {
      navbar =
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
          <Navbar.Brand href="/">Board At Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#games">Games</Nav.Link>
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/games/recommendations/">
                <Nav.Link>Recommendations</Nav.Link>
              </LinkContainer>
            </Nav>
            <Button
              variant="contained"
              onClick={() => {
                this._userLogout()
              }}
            >Logout</Button>
          </Navbar.Collapse>
        </Navbar>

      homeRedirect = <Redirect from='/' to='/games' />
    }

    return (
      <div className="App">
        <NotificationContainer key="app" />
        {navbar}
        <Container fluid className="py-5 px-md-5">
          <Switch>
            <Route path='/login'component={Login}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/games/recommendations' component={Recommendations} />
            <Route path='/games' component={Games}/>
            <Route path="/gamesAdd" component={AddGame}/>
            <Route path='/game/:id' component={Game}/>
            <Route path='/collections/:collectionId' component={Collection} />
            <Route exact path='/profile' component={UserProfile}/>
            <Route exact path='/profile/edit' component={EditUserProfile}/>
            {homeRedirect}
          </Switch>
        </Container>
      </div>
    );
  }
}

// Connect state and imported functions to Redux Store
// connect(states, dispatch functions)
export const App = connect(state => {
  const { user } = state
  const { game } = state
  return { user, game }

  // bindActionCreators turns an object whose values are action creators, into an object with the same keys,
  // but with every action creator wrapped into a dispatch call so they may be invoked directly.
}, dispatch => {
  return bindActionCreators({
    userLogin, userReset, checkLoggedIn, userLoading, userUnsetIsNew, resetCollection
  }, dispatch)
})(_App)

