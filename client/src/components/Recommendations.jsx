// React, Redux imports
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
// Action imports
import { getRecommendations, getSetGameState, getGamesAvgRating } from '../actions/index'
// Component imports
import { Notifier } from './Notifier.jsx'
import * as shared from './shared'
// Other imports
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Spinner } from 'react-bootstrap';

// ------------------------------------
// Recommendations Class
// Renders paginated table of recommended games
// ------------------------------------
class _Recommendations extends React.Component {
  constructor(props) {
    super(props)
    this._setGame = this._setGame.bind(this)
    this.state = {
      viewGame: false,
      gameID: null,
    }
  }

  componentDidMount() {
    this.props.getRecommendations();
    this.props.getGamesAvgRating();
  }

  _setGame(game) {
    this.setState({ viewGame: true, gameID: game.id });
  }

  render() {
    const { user } = this.props
    const { recommendations } = this.props

    let tableData = []
    let notifier
    let setGame = this._setGame // gives access to this._setGame in bootstrap table

    if ((user.isFetching && !user.isReceived) || !recommendations || !recommendations.isReceived || user.isNew) {
      return (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" />
        </div>
      );
    }

    // Redirect to Home page if user logs out on games page
    if (!user.isLoggedIn) {
      return <Redirect push to='/login'/>
    }

    // if game selected, redirect to game page
    if (this.state.viewGame) {
      return <Redirect push to={'/game/' + this.state.gameID} />
    }

    // Create error notification
    if (recommendations.error !== null) {
      notifier = <Notifier type="ERROR_GAMES" />
    }

    // Display message if no recommendations
    if (recommendations.rows.length === 0) {
      notifier = <Notifier type="NO_RECOMMENDATIONS" />
    }

    // Push games to table data
    recommendations.rows.forEach(function (game) {
      var categories = []

      game.categories.forEach(function (category) {
        categories.push(
          <Grid item xs={12}>
            {category}
          </Grid>
        )
      })

      tableData.push({
        // Hidden columns that show in expand renderer
        id: game.id,
        isUserCreated: game.isUserCreated,
        identifierID: game.identifierID,
        name: game.name,
        publisher: game.publisher,
        year: game.year,
        minPlaytime: game.minPlaytime,
        minPlayers: game.minPlayers,
        maxPlayers: game.maxPlayers,
        minAge: game.minAge,
        imgFileName: game.imgFileName,
        description: game.description,
        categories: game.categories,
        viewer:
          <Grid container spacing={1}>
            <Grid item container xs={12} spacing={1} className="align-items-center">
              <Grid item sm={8} xs={12}>
                <h2>{game.name}</h2>
              </Grid>
              <Grid item sm={4} xs={12} className="text-sm-right">
                <Rating
                  name="half-rating-read"
                  value={game.avgRating}
                  precision={0.1}
                  size="large"
                  readOnly
                />
              </Grid>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="NameImgWrapper">
                <Paper className='ImgWrapper'>
                  <img alt='Boardgame cover' className='ImgCenter' src={game.imgFileName} />
                </Paper>
              </div>
            </Grid>
            <Grid item md={5} sm={8} xs={12}>
              <div className="DetailsWrapper mt-2">
                <Grid container spacing={1}>
                  <Grid item xs={12}><h5>Details</h5><hr /></Grid>

                  <Grid item xs={5}>Players:</Grid>
                  <Grid item xs={7}>{game.minPlayers} - {game.maxPlayers}</Grid>

                  <Grid item xs={5}>Minimum Age:</Grid>
                  <Grid item xs={7}>{game.minAge}</Grid>

                  <Grid item xs={5}>Playtime:</Grid>
                  <Grid item xs={7}>{game.minPlaytime} - {game.maxPlaytime} minutes</Grid>

                  <Grid item xs={5}>Publisher:</Grid>
                  <Grid item xs={7}>{game.publisher}</Grid>

                  <Grid item xs={5}>Year Published:</Grid>
                  <Grid item xs={7}>{game.year}</Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item sm={4} xs={12}>
              <div className="CategoriesWrapper mt-2">
                <Grid item xs={12}><h5>Categories</h5><hr /></Grid>
                {categories}
              </div>
            </Grid>
            <Grid item xs={12} className="d-none d-sm-block">
              <div className="DescriptionWrapper mt-2">
                <h5>Description</h5>
                <p className="DescriptionP bg-light p-2">
                  {game.description}
                </p>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => setGame(game)}
                variant="contained"
                size="medium"
                className="mb-2"
                type="submit"
              >See Reviews</Button>
            </Grid>
          </Grid>
      })
    })

    return (
      <div className="Games">
        <Grid container spacing={3}>
          {notifier}
          <Grid item xs={6} className="GamesTitleRow">
            <h1>Recommendations</h1>
          </Grid>
          <Grid item xs={12} className="GamesTableRow">
            <div className="GamesTable">
              <BootstrapTable
                keyField="id"
                data={tableData}
                columns={shared.GamesColumns}
                bordered={false}
                pagination={paginationFactory(shared.PaginationOptions)}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export const Recommendations = connect(state => {
  const { user } = state
  const { recommendations } = state
  return { user, recommendations }
}, dispatch => {
  return bindActionCreators({
    getSetGameState, getRecommendations, getGamesAvgRating
  }, dispatch)
})(_Recommendations)
