import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userLogin, userLoading } from "../actions"
import {Form, Button, InputGroup} from 'react-bootstrap'
import Typography from '@material-ui/core/Typography';

class _Home extends Component {
    constructor(props) {
        super(props)
        this._login = this._login.bind(this)
        this._handleChange = this._handleChange.bind(this)

        this.state = {
            username: null,
            password: null,
        }
    }


    componentDidMount() {
    }

    _login(e) {
        e.preventDefault();

        const username = this.state.username
        const password = this.state.password

        console.log(this.state)

        // Dispatch loading and login attempt
        this.props.userLoading()
        this.props.userLogin(username, password)

        return false
    }

        // Sets value for form
    _handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {

        return (
        <div className="Login">
            <h1>Home</h1>
        </div>
        )
    }
}

export const Home = connect(null, null)(_Home)
