import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

  _updateProfile = (evt) => {

  }

  _handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }


  render() {
    return (
			<div className="Login">
				{/* {notifier} */}
				<Form onSubmit={this.updateProfile}>
					<Typography variant="h4">Edit Profile</Typography>
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
						>Sign Up</Button>
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
    // setUserProfile
  }, dispatch)
})(_EditUserProfile);