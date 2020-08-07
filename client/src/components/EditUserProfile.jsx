import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import '../css/EditUserProfile.css';
import { updateUser, userLoading } from '../actions/index';
import { Notifier } from './Notifier.jsx';

class _EditUserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formError: null,
      username: null,
      email: null,
      password: null,
      passwordConfirm: null,
    };
  }

  _updateProfile = (event) => {
    event.preventDefault();

    const form = { ...this.state };

    // Check password and confirm password
    if (form.password !== form.passwordConfirm) {
      this.setState({ formError: "ERROR_SIGNUP_PASSWORD" });
      return;
    }

    Object.keys(form).forEach(key => form[key] === null && delete form[key]);

    if (Object.keys(form).length === 0) {
      this.setState({ formError: "ERROR_EMPTY_FIELDS" });
      return;
    }

    this.props.userLoading();

    this.props.updateUser(form);
  }

  _handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }


  render() {
    const { user } = this.props;
    let notifier;

    // Check form for error
    if (this.state.formError != null) {
      notifier = <Notifier type={this.state.formError} />
      this.setState({ formError: null })
    }

    if (user.notifType !== null) {
      notifier = <Notifier type={user.notifType}/>
    }

    return (
      <div className="EditProfile">
        {notifier}
        <Form onSubmit={this._updateProfile}>
          <Typography variant="h4">Edit Profile</Typography>
          <hr />
          <div className='profileImgWrapper'>
            <Paper>
              <EditIcon fontSize="small" backgroundColor="black" />
              <img alt='profile img' src={user.imgFileName} />
            </Paper>
          </div>
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
              variant="primary"
              type="submit"
            >Update Profile</Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export const EditUserProfile = connect(state => {
  const { user } = state;
  return { user };
}, dispatch => {
  return bindActionCreators({
    updateUser, userLoading
  }, dispatch)
})(_EditUserProfile);