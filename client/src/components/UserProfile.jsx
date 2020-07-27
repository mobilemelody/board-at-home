import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../css/UserProfile.css';

class _UserProfile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { user } = this.props

    return (
      <div className="UserProfile">
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant='h5'>Jedderino</Typography>
            <Paper className='profileImgWrapper'>
              <img alt='profile img' src='https://boardathome.s3.us-east-2.amazonaws.com/user/test.jpg'/>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <span className="heading">Profile</span>
            <hr/>
            <div>Email: piezasj@oregonstate.edu</div>
            <Grid item xs={4}/>
            <div>Number of games: 12</div>
          </Grid>
          <Grid item xs={4}>
            <span className="heading">Reviews</span>
            <hr/>
            <div className="review">This game was great. I really enjoy beating my kids at this game every time!</div>
            <div>The game takes too long to finish.</div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export const UserProfile = connect(state => {
  const { user } = state
  return { state }
}, null)(_UserProfile);