import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, getUserReviews } from '../actions/index';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../css/UserProfile.css';

class _UserProfile extends React.Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getUserReviews();
  }

  render() {
    const { user } = this.props

    return (
      <div className="UserProfile">
        <Grid container spacing={1}>
          <Grid item md={4} xs={4}>
            <Typography variant='h5'>{user.username}</Typography>
            <Paper className='profileImgWrapper'>
              <img alt='profile img' src={user.imgFileName}/>
            </Paper>
            <div className="num-collections">Number of collections: 12 </div>
          </Grid>
          <Grid item md={8} xs={8}>
            <span className="heading">Reviews</span>
            <hr/>
            {
              user.reviews.map((review) => (
                <div key={review.id} className="review">
                  <div>
                    <span className="review__name">{review.name}</span>
                    <div className="review__overall-rating">User score: {review.overallRating}</div>
                  </div>
                  <div className="review__comments">{review.comments}</div>
                </div>
              ))
            }
          </Grid>
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
    getUser, getUserReviews
  }, dispatch)
})(_UserProfile);