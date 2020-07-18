import {NotificationManager} from 'react-notifications'

export const createNotification = (type) => {
    switch (type) {
    case 'RECEIVE_REVIEW_INSERT':
        NotificationManager.info("", "Review Added",5000)
        break

    case 'RECEIVE_REVIEW_DELETE':
        NotificationManager.info("", "Review Deleted",5000)
        break

    case 'RECEIVE_REVIEW_UPDATE':
        NotificationManager.info("", "Revied Updated",5000)
        break

    case 'ERROR_INSERT_REVIEW': 
        NotificationManager.error("Try again later", "Error Inserting Review",5000)
        break

    case 'ERROR_INSERT_REVIEW': 
        NotificationManager.error("Try again later", "Error Inserting Review",5000)
        break

    case 'ERROR_REVIEWS_RECEIVE':
        NotificationManager.error('Try again later','Reviews unavailable')

    case 'ERROR_UPDATE_REVIEW':
        NotificationManager.error('Try again later', "Error Updating Review")
    }
}