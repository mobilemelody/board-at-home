import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getRecommendations, getSetGameState } from '../actions/index'

import { Notifier } from './Notifier.jsx'
import { Redirect } from 'react-router-dom'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Container, Button, Spinner } from 'react-bootstrap'

import { Login } from './Login'

const GamePageTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing { from} to { to} of { size} Results
  </span>
)

// Other Review table columns
const GamesColumns = [{
  dataField: 'id',
  text: '',
  hidden: true
}, {
  dataField: 'isUserCreated',
  classes: 'isUserCreated',
  text: '',
  hidden: true,
}, {
  dataField: 'identifierID',
  classes: 'identifierID',
  text: '',
  hidden: true,
}, {
  dataField: 'name',
  classes: 'name',
  text: '',
  hidden: true,
}, {
  dataField: 'publisher',
  text: '',
  hidden: true,
}, {
  dataField: 'year',
  text: '',
  hidden: true,
}, {
  dataField: 'minAge',
  text: '',
  hidden: true,
}, {
  dataField: 'minPlaytime',
  text: '',
  hidden: true,
}, {
  dataField: 'maxPlaytime',
  text: '',
  hidden: true,
}, {
  dataField: 'minPlayers',
  text: '',
  hidden: true,
}, {
  dataField: 'maxPlayers',
  text: '',
  hidden: true,
}, {
  dataField: 'imgFileName',
  text: '',
  hidden: true,
}, {
  dataField: 'description',
  text: '',
  hidden: true,
}, {
  dataField: 'viewer',
  text: '',
}]

// Set custom pagination
const GamesPaginationOptions = {
  paginationSize: 5,
  pageStartIndex: 1,
  hideSizePerPage: true,
  hidePageListOnlyOnePage: true,
  firstPageText: 'First',
  prePageText: 'Back',
  nextPageText: 'Next',
  lastPageText: 'Last',
  nextPageTitle: 'First page',
  prePageTitle: 'Pre page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
  showTotal: true,
  paginationTotalRenderer: GamePageTotal,
  disablePageTitle: true,
  sizePerPageList: [{
    text: '5', value: 5
  }]
};


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
      return <Login />
    }

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
            <Grid item xs={12}>
              <h2>{game.name}</h2>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="NameImgWrapper">
                <Paper className='ImgWrapper'>
                  <img alt='Boardgame cover' className='ImgCenter' src={game.imgFileName} />
                </Paper>
              </div>
            </Grid>
            <Grid item md={5} xs={12}>
              <div className="DetailsWrapper mt-2">
                <Grid container spacing={1}>
                  {/* Placeholder items for spacing */}
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
            <Grid item md={4} xs={12}>
              <div className="CategoriesWrapper mt-2">
                <Grid item xs={12}><h5>Categories</h5><hr /></Grid>
                {categories}
              </div>
            </Grid>
            <Grid item xs={12}>
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
                variant="info"
                size="sm"
                type="submit"
              >See Reviews</Button>
            </Grid>
          </Grid>
      })
    })

    return (
      <Container className="Games py-5">
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
                columns={GamesColumns}
                bordered={false}
                pagination={paginationFactory(GamesPaginationOptions)}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export const Recommendations = connect(state => {
  const { user } = state
  const { recommendations } = state
  return { user, recommendations }
}, dispatch => {
  return bindActionCreators({
    getSetGameState, getRecommendations
  }, dispatch)
})(_Recommendations)
