import React from 'react';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import { MDBContainer, MDBRating } from 'mdbreact';

import { Reviews } from './Review'
import { AddToCollection } from './AddToCollection';


// const RatingPage = () => {
//   return (
//     <MDBContainer>
//       <MDBRating feedback/>
//     </MDBContainer>
//   );
// };

class _Game extends React.Component {
  render() {

    const { game } = this.props
    // const { review }

    return (
      <Grid container spacing={3}>
        <Grid textAlign="left" item xs={12}>
          <Paper className="d-flex justify-content-between align-items-center">
            <h1>{game.data.name}</h1>
            <AddToCollection />
          </Paper>
          <hr className='GameLine'></hr>
        </Grid>
        <Grid item xs={5}>
          <Paper className='Img'>
            <img alt='Boardgame cover' className='ImgCenter' src={game.data.imgFileName} />
            <br />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}></Grid>
            <Grid item xs={6}>Players:</Grid>
            <Grid item xs={6}>{game.data.minPlayers} - {game.data.maxPlayers}</Grid>

            <Grid item xs={6}>Minimum Age:</Grid>
            <Grid item xs={6}>{game.data.minAge}</Grid>

            <Grid item xs={6}>Playtime:</Grid>
            <Grid item xs={6}>{game.data.minPlaytime} - {game.data.maxPlaytime} minutes</Grid>

            <Grid item xs={6}>Publisher:</Grid>
            <Grid item xs={6}>{game.data.publisher}</Grid>

            <Grid item xs={6}>Year Published:</Grid>
            <Grid item xs={6}>{game.data.year}</Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={12}>
          <hr className='GameLine'></hr>
          <Paper className='Description'>
            <h5>Description</h5>
            <p>{game.data.description}</p>
          </Paper>
        </Grid>

        {/* Review Body */}
        <Reviews />

        <Grid item xs={12}>
          <hr />
        </Grid>
      </Grid>
    )
  }
}

export const Game = connect(state => {
  const { game } = state
  return { game }
}, null)(_Game)
