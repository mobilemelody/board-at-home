import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userLogin, userLoading } from "../actions"

class _Login extends Component {
    constructor(props) {
        super(props)
        this._login = this._login.bind(this)
    }


    componentDidMount() {
    }

    _login(e) {
        e.preventDefault();
        const username = this.refs.username.value
        const password = this.refs.password.value

        // Dispatch loading and login attempt
        this.props.userLoading()
        setTimeout(() => {
            this.props.userLogin(username, password)
        }, 6000)
        return false
    }
    render() {

        return (
        <div className="login">
            <h1 className="page-title">Login</h1>
            <div className="login__form-wrapper">
            <form className="login__form form form_dark" onSubmit={this._login}>
                <div className="form__field">
                <input type="username" id="username" ref="username" className="form__input" placeholder="Username"/>
                </div>
                <div className="form__field">
                <input type="password" id="password" ref="password" className="form__input" placeholder="Password"/>
                </div>
                <div className="form__actions">
                <button className="form__submit" type="submit">Sign In</button>
                </div>
            </form>
            </div>
        </div>
        )
    }
}

export const Login = connect(null, dispatch => {
    return bindActionCreators({
    userLogin, userLoading
}, dispatch)})(_Login)
