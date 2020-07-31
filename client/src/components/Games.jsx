import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getGames, getSetGameState } from '../actions/index'

import {Notifier} from './Notifier.jsx'
import {Link, Redirect} from 'react-router-dom'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import {Button} from 'react-bootstrap'

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


class _Games extends React.Component {
    constructor(props) {
        super(props)
        this._setGame = this._setGame.bind(this)
        this.state = {
            viewGame: false
        }
    }

    componentDidMount() {
        this.props.getGames()
    }

    _setGame(game) {
        this.props.getSetGameState({
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
        })
        this.setState({viewGame: true})
        console.log("set game")
    }

  render() {
    const { user } = this.props
    const { games } = this.props

    let tableData = []
    let notifier

    // Redirect to Home page if user logs out on games page
    if (!user.isLoggedIn) {
        return <Redirect to='/login'/>
    }

    if (this.state.viewGame) {
        return <Redirect push to='/game'/>
    }

    // Create error notification
    if (games.error !== null) {
        notifier = <Notifier type="ERROR_GAMES"/>
    }

    // Create error notification
    if (games.error !== null) {
      notifier = <Notifier type="ERROR_GAMES" />
    }

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this._setGame(row)
      }
    }

    // Push reviews to table data
    games.rows.forEach(function (game) {
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
                <p>Not yet implemented</p>
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
            <Grid item xs={12}>
              <Button
                variant="info"
                size="sm"
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
        <Grid item xs={12}><br /></Grid>
        <Grid item xs={10} className="GamesTitleRow">
          <Typography variant="h3">Games</Typography>
        </Grid>
        <Grid item xs={2} className="GamesTitleRow">
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
              keyField="id"
              data={tableData}
              columns={GamesColumns}
              rowEvents={rowEvents}
              // expandRow={ OtherReviewsExpandRow }
              bordered={false}
              pagination={paginationFactory(GamesPaginationOptions)}
            />
          </div>
        </Grid>
      </Grid>
      </div>
    )
  }
}

export const Games = connect(state => {
  const { user } = state
  const { games } = state 
  return { user, games}
}, dispatch => {
  return bindActionCreators({
    getSetGameState, getGames
  }, dispatch)
})(_Games)