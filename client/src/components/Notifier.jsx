// React, Redux imports
import React, { Component } from "react"
import { connect } from "react-redux"
// Other imports
import { NotificationManager } from "react-notifications"

// ------------------------------------
// Notifier Class 
// Creates notification from props 
// ------------------------------------
class _Notifier extends Component {
	constructor(props) {
		super(props);
		this._createNotification = this._createNotification.bind(this);
	}

	componentDidMount() {
		this._createNotification(this.props.type);
	}

	_createNotification(type) {
		switch (type) {

			case "ERROR_SIGNUP_ALL_FIELDS":
				NotificationManager.error("Try again", "All fields required for signup", 5000)
				break

			case "ERROR_SIGNUP_PASSWORD":
				NotificationManager.error("Try again", "Password and confirmed password must match", 5000)
				break

			case "ERROR_SIGNUP_EMAIL":
				NotificationManager.error("Try again", "Email and confirmed email must match", 5000)
				break

			case "ERROR_LOGIN":
				NotificationManager.error("Try again", "Invalid username/password", 5000)
				break

			case 'RECEIVE_USER_UPDATE':
				NotificationManager.info('', 'Profile updated successfully', 5000)
				break

			case 'ERROR_USER_UPDATE':
				NotificationManager.error('', 'Error updating profile', 5000)
				break

			case 'ERROR_EMPTY_FIELDS':
				NotificationManager.error('', 'Please update at least one field', 5000)
				break

			case 'ERROR_GAMES':
				NotificationManager.error("Try again later", "Error Getting Games", 5000)
				break

			case "RECEIVE_REVIEW_INSERT":
				NotificationManager.info("", "Review Added", 5000)
				break

			case "RECEIVE_REVIEW_DELETE":
				NotificationManager.info("", "Review Deleted", 5000)
				break

			case 'RECEIVE_REVIEW_UPDATE':
				NotificationManager.info("", "Review Updated", 5000)
				break

			case "ERROR_INSERT_REVIEW":
				NotificationManager.error("Try again later", "Error Inserting Review", 5000)
				break

			case "ERROR_DELETE_REVIEW":
				NotificationManager.error("Try again later", "Error Deleting Review", 5000)
				break

			case "ERROR_REVIEWS_RECEIVE":
				NotificationManager.error("Try again later", "Reviews unavailable")
				break

			case "ERROR_UPDATE_REVIEW":
				NotificationManager.error("Try again later", "Error Updating Review")
				break

			case "NO_RECOMMENDATIONS":
				NotificationManager.error("Try reviewing some more games","No recommendations")
				break

			case "ERROR_GAME":
				NotificationManager.error("Try again", "Unable to view game")
				break

			default:
				break
		}
	}
	render() {
		return (<div className="blank" />)
	}
}


export const Notifier = connect(null, null)(_Notifier);
