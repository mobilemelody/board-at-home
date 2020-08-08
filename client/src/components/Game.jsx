import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Redirect } from "react-router-dom";
import { Container, Spinner } from 'react-bootstrap';
import { getGame, gameLoading, resetGame, fetchGameAvgRating, getGameAvgRating } from '../actions/index'

import { Reviews } from './Review'
import { AddToCollection } from './AddToCollection';
import { Notifier } from './Notifier';
import * as shared from './shared';

class _Game extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.props.resetGame()
      this.props.gameLoading()
      this.props.getGame(this.props.match.params.id)
    });

    this.props.resetGame()
    this.props.gameLoading()
    this.props.getGame(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {

    const { game, user } = this.props;
    let body;

    if (user.isNew) {
      return (
      <div className="spinner-wrapper">
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      </div>
      );
    }

    if(game.error != null) {
      return (
        <div>
          <Notifier type="ERROR_GAME"/>
          <Redirect to="/"/>
        </div>
      );
    }

    // if user state is not fetching, not received, and not new
    // at this point, there is no token & id in localStorage, so route should redirect to login
    if(!user.isReceived && !user.isFetching && !user.isNew) {
      return <Redirect to='/login' />
    }

    if (game.isReceived) {
      var categories = [];
      var avgReview;

      if (!game.isAvgRatingReceived && !game.isAvgRatingFetching && game.error == null) {
        this.props.getGameAvgRating(game.data.id);
      }

      if (game.isAvgRatingReceived) {
        avgReview = shared.avgRating(game.avgRating);
      }
 
      if (game.data.categories) {
        game.data.categories.forEach(function (category) {
          categories.push(
            <Grid item xs={12}>
              <div className="Category">
                {category}
              </div>
            </Grid>
          );
        });
      }

      body =
        <Grid container spacing={3}>
          <Grid container item xs={12} className="align-items-center">
            <Grid item sm={6} xs={12}>
              <h1>{game.data.name}</h1>
            </Grid>
            <Grid item sm={6} xs={12} className="text-sm-right">
              <AddToCollection />
            </Grid>
            <Grid item xs={12}><hr className='GameLine'></hr></Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <Paper className='ImgWrapper'>
              <img alt='Boardgame cover' className='ImgCenter' src={game.data.imgFileName} />
            </Paper>
                <div className="AvgRating">
                  {avgReview}
                </div>
          </Grid>
          <Grid item md={5} xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}><h5>Details</h5><hr /></Grid>

              <Grid item xs={5}>Players:</Grid>
              <Grid item xs={7}>{game.data.minPlayers} - {game.data.maxPlayers}</Grid>

              <Grid item xs={5}>Minimum Age:</Grid>
              <Grid item xs={7}>{game.data.minAge}</Grid>

              <Grid item xs={5}>Playtime:</Grid>
              <Grid item xs={7}>{game.data.minPlaytime} - {game.data.maxPlaytime} minutes</Grid>

              <Grid item xs={5}>Publisher:</Grid>
              <Grid item xs={7}>{game.data.publisher}</Grid>

              <Grid item xs={5}>Year Published:</Grid>
              <Grid item xs={7}>{game.data.year}</Grid>
            </Grid>
          </Grid>
          <Grid item md={4} xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}><h5>Categories</h5><hr /></Grid>
              {categories}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <hr className='GameLine'></hr>
            <Paper className='Description'>
              <h5>Description</h5>
              <p>{game.data.description}</p>
            </Paper>
          </Grid>
          <Reviews />
          <Grid item xs={12}>
            <hr />
          </Grid>
        </Grid>
    }

    return (
      <Container className='Game py-5'>
        {body}
      </Container>
    );
  }
}

export const Game = connect(state => {
  const { game, user } = state
  return { game, user }
}, dispatch => {
  return bindActionCreators({
    getGame, gameLoading, resetGame, fetchGameAvgRating, getGameAvgRating
  }, dispatch)
})(_Game)
