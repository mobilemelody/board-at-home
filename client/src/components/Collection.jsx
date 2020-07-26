import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Notifier } from './Notifier.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import BootstrapTable from 'react-bootstrap-table-next';
import AddIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import PublicIcon from '@material-ui/icons/Public';

// Import Actions
import { getCollection, getSetCollectionState } from '../actions/index'

// Column names for table of games
const tableColumns = [{
  dataField: 'id',
  text: 'Game ID',
  hidden: true
}, {
  dataField: 'gameInfo',
  text: 'Game',
}, {
  dataField: 'players',
  text: 'Players',
  align: 'center',
  headerAlign: 'center'
}, {
  dataField: 'playtime',
  text: 'Playtime',
  align: 'center',
  headerAlign: 'center'
}, {
  dataField: 'overallRating',
  text: 'Rating',
  align: 'center',
  headerAlign: 'center'
}, {
  dataField: 'remove',
  text: '',
  align: 'center',
  style: { width: '50px' },
  headerStyle: { width: '50px' }
}];

class _Collection extends React.Component {
  constructor(props) {
    super(props);
    this._setCollection = this._setCollection.bind(this)
  }

  componentDidMount() {
    this.props.getCollection();
  }

  _setCollection(collection) {
    this.props.getSetCollectionState(collection);
  }

  render() {

    const collection = this.props.collection.data;
    console.log(this.props.collection);

    let tableData = collection.games;
    tableData.forEach(game => {
      game.gameInfo = <a href={game.url}><img src={game.imgFileName} height="50"/> {game.name}</a>;
      game.players = <div>{game.minPlayers} - {game.maxPlayers}</div>;
      game.playtime = <div>{game.minPlaytime} - {game.maxPlaytime} min</div>;
      game.remove = <IconButton aria-label="remove"><DeleteIcon/></IconButton>;

    });

    let privacy = collection.isPrivate ? <Chip icon={<LockIcon/>} label="Private" size="small" /> : <Chip icon={<PublicIcon/>} label="Public" size="small" />

    return (
      <Container className="py-3">
        <Row>
          <Col xs={12} md={8}>
            <h1>Collection Name <IconButton aria-label="edit"><EditIcon/></IconButton></h1>
            { privacy }
          </Col>
          <Col>
            <Button variant="contained" startIcon={<AddIcon/>} size="large" className="float-md-right">Add Game</Button>
          </Col>
        </Row>
        <BootstrapTable
          keyField="id"
          data={ tableData }
          columns={ tableColumns }
          bordered={ false }
        />
      </Container>
    );
  }
}

export const Collection = connect(state => {
  const { collection } = state;
  return { collection };
}, dispatch => {
  return bindActionCreators({
    getCollection, getSetCollectionState
  }, dispatch)
})(_Collection)
