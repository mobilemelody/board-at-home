import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, getUserReviews, getUserCollections } from '../actions/index';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import { LinkContainer } from 'react-router-bootstrap';
import BoardGameCollection from '../svg/board-game-collection';
import '../css/UserProfile.css';

class _UserProfile extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  allFetched = (user) => {
    return user.isReceived && user.isReviewsReceived;
  }

  render() {
    const { user } = this.props

    return this.allFetched(user) && (
      <div className="UserProfile">
        <Grid container spacing={1}>
          <Grid item md={4} xs={4}>
            <Typography variant='h5'>{user.userName}</Typography>
            <Paper className='profileImgWrapper'>
              <img alt='profile img' src={user.imgFileName}/>
            </Paper>
            <div className="email">Email: {user.email}</div>
            <div className="num-collections">Number of collections: {user.collections.length} </div>
          </Grid>
          <Grid item md={8} xs={8}>
            <span className="heading">Reviews</span>
            <hr/>
            {
              user.reviews.map((review, idx) => (
                <div key={review.id} className={`review ${idx % 2 > 0 && 'review-odd'}`}>
                  <div>
                    <span className="review__name">{review.name}</span>
                    <Rating
                      className="review__overall-rating"
                      name="overallRating"
                      value={review.overallRating}
                      readOnly
                      size="small"
                    />
                  </div>
                  <div className="review__comments">{review.comments}</div>
                </div>
              ))
            }
          </Grid>
        </Grid>
        <span className="heading">Collections</span>
        <hr/>
        <Grid container justify="flex-start" className="collections" spacing={1}>
          {
            user.collections.map((collection) => (
              <Grid item md={3} xs={3}>
                <LinkContainer to={`/collections/${collection.id}`}>
                  <div className="collection-container">
                    <BoardGameCollection/>
                    <div className="collection-name">{collection.name}</div>
                    <div className="overlay"></div>
                    <div className="collection-details">
                      <div className="overlay-title">Number of games: {collection.gameCount}</div>
                    </div>
                  </div>
                </LinkContainer>
              </Grid>
            ))
          }
        </Grid>
      </div>
    );
  }
}

export const UserProfile = connect(state => {
  const { user } = state;
  return { user };
}, dispatch => {
  return bindActionCreators({
    getUser, getUserReviews, getUserCollections
  }, dispatch)
})(_UserProfile);