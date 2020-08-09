import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import React from 'react'


export const avgRating = (rating) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={6}>
        <h5>Average Rating</h5>
      </Grid>
      <Grid item xs={6}>
        <Rating
          name="half-rating-read"
          value={rating}
          precision={0.5}
          disabled
        />
      </Grid>
    </Grid>
  )
}