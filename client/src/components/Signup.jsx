import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userLoading, userSignUp } from "../actions"
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { Notifier } from './Notifier.jsx'
import { Redirect } from "react-router-dom";

class _Signup extends Component {
  constructor(props) {
    super(props)
    this._signUp = this._signUp.bind(this)
    this._handleChange = this._handleChange.bind(this)

    this.state = {
      redirect: false,
      formError: null,
      username: null,
      email: null,
      emailConfirm: null,
      password: null,
      passwordConfirm: null,
    }
  }

  _signUp(event) {
    event.preventDefault();

    var form = this.state
    var isNull = false

    // check for state object being null
    Object.keys(form).forEach(key => {
      if (form[key] == null && key !== 'formError') {
        isNull = true
      }
    })
    // If null is present, trigger notification
    if (isNull) {
      this.setState({ formError: "ERROR_SIGNUP_ALL_FIELDS" })
      return
    }

    // Check email and confirm email
    if (form.email !== form.emailConfirm) {
      this.setState({ formError: "ERROR_SIGNUP_EMAIL" })
      return
    }

    // Check password and confirm password
    if (form.password !== form.passwordConfirm) {
      this.setState({ formError: "ERROR_SIGNUP_PASSWORD" })
      return
    }

    // Dispatch loading and signup attempt
    this.props.userLoading()

    this.props.userSignUp({
      username: form.username,
      email: form.email,
      password: form.password
    })

    this.setState({ redirect: true })
  }

  // Sets value for form
  _handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    let notifier

    if (this.state.redirect) {
      return <Redirect to='/login' />
    }

    // Check form for error
    if (this.state.formError != null) {
      notifier = <Notifier type={this.state.formError} />
      this.setState({ formError: null })
    }

    return (
      <div className="Login">
        {notifier}
        <Form onSubmit={this._signUp} className="col-md-8 offset-md-2">
          <h1>Sign Up</h1>
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={this.state.email}
              onChange={this._handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Email</Form.Label>
            <Form.Control
              name="emailConfirm"
              type="email"
              value={this.state.emailConfirm}
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
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="passwordConfirm"
              value={this.state.passwordConfirm}
              onChange={this._handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >Sign Up</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export const Signup = connect(null, dispatch => {
  return bindActionCreators({
    userLoading, userSignUp
  }, dispatch)
})(_Signup)