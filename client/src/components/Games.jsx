import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getGames, getSetGameState, getGamesAvgRating } from '../actions/index'

import { Notifier } from './Notifier.jsx'
import { Link, Redirect } from 'react-router-dom'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { Button, Spinner } from 'react-bootstrap'
import * as shared from './shared';

const GamePageTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing { from} to { to} of { size} Results
  </span>
)

// Other Review table columns
const GamesColumns = [{
  dataField: 'id',
  text: '',
  hidden: true,
  searchable: false,
}, {
  dataField: 'isUserCreated',
  classes: 'isUserCreated',
  text: '',
  hidden: true,
  searchable: false,
}, {
  dataField: 'identifierID',
  classes: 'identifierID',
  text: '',
  hidden: true,
  searchable: false,
}, {
  dataField: 'name',
  classes: 'name',
  text: '',
  hidden: true,
}, {
  dataField: 'publisher',
  text: '',
  hidden: true,
  searchable: false,
}, {
  dataField: 'year',
  text: '',
  hidden: true,
}, {
  dataField: 'minAge',
  text: '',
  hidden: true,
  searchable: false,
}, {
  dataField: 'minPlaytime',
  text: '',
  hidden: true,
  searchable: false,
}, {
  dataField: 'maxPlaytime',
  text: '',
  hidden: true,
  searchable: false,
}, {
  dataField: 'minPlayers',
  text: '',
  hidden: true,
  searchable: false,
}, {
  dataField: 'maxPlayers',
  text: '',
  hidden: true,
  searchable: false,
}, {
  dataField: 'imgFileName',
  text: '',
  hidden: true,
  searchable: false,
}, {
  dataField: 'description',
  text: '',
  hidden: true,
}, {
  dataField: 'viewer',
  text: '',
}, {
  dataField: 'categories',
  text: '',
  hidden: true,
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


class _Games extends React.Component {
  constructor(props) {
    super(props)
    this._setGame = this._setGame.bind(this)
    this.state = {
      viewGame: false,
      gameID: null,
    }
  }

  componentDidMount() {
    this.props.getGames()
    this.props.getGamesAvgRating()
  }

  _setGame(game) {
    this.setState({ viewGame: true, gameID: game.id })
  }

  render() {
    const { user } = this.props
    const { games } = this.props
    const { SearchBar } = Search;

    let tableData = []
    let notifier
    let setGame = this._setGame // gives access to this._setGame in bootstrap table

    // At beginning of user state, check to see if user state action has been dispatched
    if (user.isNew) {
      return (
      <div className="spinner-wrapper">
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      </div>
      )
    }

    // if user state is not fetching, not received, and not new
    // at this point, there is no token & id in localStorage, so route should redirect to login
    if(!user.isReceived && !user.isFetching && !user.isNew) {
      return <Redirect to='/login' />
    }

    if (this.state.viewGame) {
      return <Redirect push to={'/game/'+this.state.gameID} />
    }

    // Create error notification
    if (games.error !== null) {
      notifier = <Notifier type="ERROR_GAMES" />
    }

    // Create error notification
    if (games.error !== null) {
      notifier = <Notifier type="ERROR_GAMES" />
    }

    // Push reviews to table data
    if (games.isReceived) {

      games.rows.forEach(function (game) {
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
              <Grid item xs={4}>
                <div className="NameImgWrapper">
                  <Typography variant='h5'>{game.name}</Typography>
                  <Paper className='ImgWrapper'>
                    <img alt='Boardgame cover' className='ImgCenter' src={game.imgFileName} />
                  </Paper>
                </div>
              </Grid>
              <Grid item xs={5}>
                <div className="DetailsWrapper">
                  <Grid container spacing={1}>
                    {/* Placeholder items for spacing */}
                    <Grid item xs={12}><br /><br />Details<hr /></Grid>

                    <Grid item xs={4}>Players:</Grid>
                    <Grid item xs={4}>{game.minPlayers} - {game.maxPlayers}</Grid>
                    <Grid item xs={4}></Grid>

                    <Grid item xs={4}>Minimum Age:</Grid>
                    <Grid item xs={4}>{game.minAge}</Grid>
                    <Grid item xs={4}></Grid>

                    <Grid item xs={4}>Playtime:</Grid>
                    <Grid item xs={7}>{game.minPlaytime} - {game.maxPlaytime} minutes</Grid>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={4}>Publisher:</Grid>
                    <Grid item xs={7}>{game.publisher}</Grid>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={4}>Year Published:</Grid>
                    <Grid item xs={4}>{game.year}</Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="CategoriesWrapper">
                  <Grid item xs={12}><br /><br />Categories<hr /></Grid>
                  {categories}
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="DescriptionWrapper">
                  <h5>Description</h5>
                  <p className="DescriptionP">
                    {game.description}
                  </p>
                </div>
              </Grid>
              <Grid item xs={5}>
                <div className="RatingWrapper">
                  { 
                    games.isAvgRatingsReceived ? shared.avgRating(games.avgRatings[game.id]) : <div/>
                  }
                </div>
              </Grid>
              <Grid item xs={5}/>
              <Grid item  xs={2}>
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
    }

    return (
      <div className="Games">
        <Grid container spacing={3}>
          {notifier}
          <Grid item xs={12}><br /></Grid>
          <ToolkitProvider
            keyField="id"
            data={tableData}
            columns={GamesColumns}
            search
          >
            {
              props =>
              <>
                <Grid item xs={2} className="GamesTitleRow">
                  <Typography variant="h3">Games</Typography>
                </Grid>
                <Grid item xs={8} className="GamesSearchBarContainer">
                  <SearchBar {...props.searchProps} placeholder="Search for a game" className="GamesSearchBar"/>
                </Grid>
                <Grid item xs={2} className="AddNewGame">
                  <Link to='/gamesAdd'>
                    <Button
                      variant="info"
                      size="sm"
                    >Add New Game</Button>
                  </Link>
                </Grid>
                <Grid item xs={12} className="GamesTableRow">
                  <div className="GamesTable">
                    <BootstrapTable
                      {...props.baseProps}
                      pagination={paginationFactory(GamesPaginationOptions)}
                      bordered={false}
                    />
                  </div>
                </Grid>
              </>
            }
          </ToolkitProvider>
        </Grid>
      </div>
    )
  }
}

export const Games = connect(state => {
  const { user } = state
  const { games } = state
  return { user, games }
}, dispatch => {
  return bindActionCreators({
    getSetGameState, getGames, getGamesAvgRating
  }, dispatch)
})(_Games)