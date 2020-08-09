import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getGames, getSetGameState, getGamesAvgRating } from '../actions/index'
import '../css/Games.css';

import { Notifier } from './Notifier.jsx'
import { Link, Redirect } from 'react-router-dom'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { Spinner } from 'react-bootstrap';

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
            <Grid item container xs={12} spacing={1} className="align-items-center">
              <Grid item sm={8} xs={12}>
                <h2>{game.name}</h2>
              </Grid>
              <Grid item sm={4} xs={12} className="text-sm-right">
                {games.isAvgRatingsReceived ? 
                  <Rating
                    name="half-rating-read"
                    value={games.avgRatings[game.id]}
                    precision={0.1}
                    size="large"
                    readOnly
                  /> : <div/>}
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
                <div className="DescriptionP bg-light p-2">
                  {game.description}
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => setGame(game)}
                variant="contained"
                size="medium"
                className="my-2"
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
          <ToolkitProvider
            keyField="id"
            data={tableData}
            columns={GamesColumns}
            search
          >
            {
              props =>
              <>
                <Grid item container xs={12} className="align-items-center">
                  <Grid item sm={4} xs={6} className="GamesTitleRow">
                    <h1>Games</h1>
                  </Grid>
                  <Grid item sm={4} xs={6} className="AddNewGame text-right">
                    <Link to='/gamesAdd'>
                      <Button
                        variant="outlined"
                        size="medium"
                        className="mr-sm-2"
                        startIcon={<AddIcon/>}
                      >Add New Game</Button>
                    </Link>
                  </Grid>
                  <Grid item sm={4} xs={12} className="GamesSearchBarContainer">
                    <SearchBar {...props.searchProps} placeholder="Search for a game" className="GamesSearchBar"/>
                  </Grid>
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