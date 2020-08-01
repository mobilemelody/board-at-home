import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Modal, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
// import DotLoader from 'react-spinners/DotLoader';

import { getCollection, getGames, addGameToCollection, removeGameFromCollection } from '../actions/index'

class _AddToCollectionSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this._openDialog = this._openDialog.bind(this);
    this._closeDialog = this._closeDialog.bind(this);
    this._addToCollection = this._addToCollection.bind(this);
    this._removeFromCollection = this._removeFromCollection.bind(this);
  }

  componentDidMount() {
    this.props.getGames();
  }

  _openDialog() {
    this.setState({ open: true });
  }

  _closeDialog() {
    this.setState({ open: false });
  }

  _addToCollection(id) {
    let collection = this.props.state.collection.data;
    this.props.addGameToCollection(collection, id)
      .then(res => {
        this.props.getCollection(collection.id);
        this.props.getGames();
      })
      .catch(err => {
        console.log(err);
      });

  }

  _removeFromCollection(id) {
    let collection = this.props.state.collection.data;
    this.props.removeGameFromCollection(collection, id)
      .then(res => {
        this.props.getCollection(collection.id);
        this.props.getGames();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    let { collection, games } = this.props.state;

    let gamesList = [];

    if (games.isReceived && !games.error) {

      // Create list of games
      // TODO: Remove manual limit on results
      let gamesInCollection = collection.data.games.map(e => e.id);
      gamesList = games.rows.slice(0, 10).map(e =>
        <ListGroup.Item key={e.id}>
          <a href={e.url}><img alt="game cover" src={e.imgFileName} height="50"/> {e.name}</a>
          <div className="float-md-right">
            {gamesInCollection.includes(e.id) ?
              <Button variant="contained" onClick={() => {this._removeFromCollection(e.id)}}>Remove Game</Button>:
              <Button variant="outlined" onClick={() => {this._addToCollection(e.id)}}>Add Game</Button>}
          </div>
        </ListGroup.Item>
      );
    }

    // TODO: Implement search
    let search =
      <InputGroup>
        <FormControl
          placeholder="Search for a game"
        />
        <InputGroup.Append>
          <Button variant="outlined"><SearchIcon/></Button>
        </InputGroup.Append>
      </InputGroup>;

    // Modal dialog content
    let body =
      <div>
        <Button variant="contained" startIcon={<AddIcon/>} size="large" onClick={this._openDialog}>
          Add Games
        </Button>
        <Modal show={this.state.open} onHide={this._closeDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Add Games</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="py-2">{search}</div>
            <div className="pt-2">
              <strong>Search results:</strong>
              <ListGroup variant="flush">{gamesList}</ListGroup>
            </div>
          </Modal.Body>
        </Modal>
      </div>;

    return (
      <div>
        {body}
      </div>
    );
  }
}

export const AddToCollectionSearch = connect(state => {
  const { collection, games } = state;
  return { state: { collection, games } };
}, dispatch => {
  return bindActionCreators({
    getCollection, getGames, addGameToCollection, removeGameFromCollection
  }, dispatch)
})(_AddToCollectionSearch)
