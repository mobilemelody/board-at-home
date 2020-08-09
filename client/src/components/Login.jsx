import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { userLogin, userLoading, userReset } from "../actions"
import Button from '@material-ui/core/Button';
import { Form } from 'react-bootstrap';
import { Notifier } from './Notifier.jsx'

class _Login extends Component {
  constructor(props) {
    super(props)
    this._login = this._login.bind(this)
    this._handleChange = this._handleChange.bind(this)

    this.state = {
      username: null,
      password: null,
    }
  }

  _login(event) {

    event.preventDefault();

    const username = this.state.username
    const password = this.state.password

    // Dispatch loading and login attempt
    this.props.userLoading()
    this.props.userLogin(username, password)
  }

  // Sets value for form
  _handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { user } = this.props
    let notifier

    if (!user.isLoggedIn && user.error != null) {
      notifier = <Notifier type="ERROR_LOGIN" />
      this.props.userReset()
    }

    if (user.isLoggedIn) {
      return <Redirect to='/' />
    }

    return (
      <div className="Login">
        {notifier}
        <Form onSubmit={this._login} className="col-md-8 offset-md-2">
          <h1>Login</h1>
          <hr />
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={this.state.username}
              onChange={this._handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              onChange={this._handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >Login</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export const Login = connect(state => {
  const { user } = state
  return { user }
}, dispatch => {
  return bindActionCreators({
    userLogin, userLoading, userReset
  }, dispatch)
})(_Login)
