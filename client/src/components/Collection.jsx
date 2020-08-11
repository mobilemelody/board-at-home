// React, Redux imports
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
// Import Actions
import { getCollection, getSetCollectionState, updateCollection, removeGameFromCollection, resetCollection } from '../actions/index'
// Component Imports
import { AddToCollectionSearch } from './AddToCollectionSearch';
// Other Imports
import { Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import BootstrapTable from 'react-bootstrap-table-next';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import PublicIcon from '@material-ui/icons/Public';
import CloseIcon from '@material-ui/icons/Close';

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
  headerAlign: 'center',
  style: { verticalAlign: 'middle' }
}, {
  dataField: 'playtime',
  text: 'Playtime',
  align: 'center',
  headerAlign: 'center',
  style: { verticalAlign: 'middle' }
}, {
  dataField: 'overallRating',
  text: 'Rating',
  align: 'center',
  headerAlign: 'center',
  style: { verticalAlign: 'middle' }
}, {
  dataField: 'remove',
  text: '',
  align: 'center',
  style: { width: '50px', verticalAlign: 'middle' },
  headerStyle: { width: '50px' }
}];


// ------------------------------------
// Collection Class 
// Renders collection from props id
// ------------------------------------
class _Collection extends React.Component {
  constructor(props) {
    super(props);
    this._setCollection = this._setCollection.bind(this);
    this._setValue = this._setValue.bind(this);
    this._setSwitchValue = this._setSwitchValue.bind(this);
    this._editCollection = this._editCollection.bind(this);

    // Local state for form data
    this.state = {
      id: null,
      name: null,
      isPrivate: null,
      isEditing: false
    }
    this.name = React.createRef();
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      const { collectionId } = this.props;
      this.props.resetCollection();
      this.props.getCollection(collectionId);
      this.setState({
        id: collectionId,
        name: this.props.collection.data.name,
        isPrivate: this.props.collection.data.isPrivate
      });
    });
    
    const { collectionId } = this.props;
    this.props.resetCollection();
    this.props.getCollection(collectionId);
    this.setState({
      id: collectionId,
      name: this.props.collection.data.name,
      isPrivate: this.props.collection.data.isPrivate
    });
  }

  componentWillUnmount() {
    this.unlisten()
    this.props.resetCollection()
  }

  _setCollection(collection) {
    this.props.getSetCollectionState(collection);
  }

  _setValue(key, value) {
    this.setState({ [key]: value });
  }

  _setSwitchValue(key) {
    const value = this.state[key];
    this.setState({ [key]: !value });
  }

  _setFormEdit(collection) {
    this.setState({ isEditing: true });
    this._setFormState(collection);
  }

  _setFormState(collection) {
    for (const [key, value] of Object.entries(collection)) {
      this._setValue(key, value)
    }
  }

  _editCollection() {
    this.setState({ isEditing: false });
    this.props.updateCollection(this.state);
  }

  _removeGame(collection, gameID) {
    this.props.removeGameFromCollection(collection, gameID)
      .then(res => {
        this.props.getCollection(collection.id);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    const { collection } = this.props;
    const { user } = this.props;

    // Show loading spinner if fetching user and/or collection
    if ((user.isFetching && !user.isReceived) || !collection.isReceived || user.isNew) {
      return (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" />
        </div>
      );
    }

    // Show login form if not logged in
    if (!user.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    let body = <div></div>;

    if (collection.isReceived && !collection.error && user.isReceived && !user.error) {
      const belongsToUser = collection.data.user.id === user.id

      // Check privacy setting
      if (collection.data.isPrivate && !belongsToUser) {
        return (
          <Alert variant="danger">
            You are not authorized to view this collection
          </Alert>
        );
      }

      let tableData = collection.data.games || [];

      tableData.forEach(game => {
        game.gameInfo = <a href={`/#/game/${game.id}`}><img alt="game cover" src={game.imgFileName} height="50"/> {game.name}</a>;
        game.players = <div>{game.minPlayers} - {game.maxPlayers}</div>;
        game.playtime = <div>{game.minPlaytime} - {game.maxPlaytime} min</div>;
        game.overallRating = <Rating value={game.overallRating} precision={0.1} size="small" readOnly/>;
        game.remove = belongsToUser ? <IconButton aria-label="remove" onClick={() => {this._removeGame(collection.data, game.id)}}><DeleteIcon/></IconButton> : '';
      });

      let privacy = collection.data.isPrivate ? <Chip icon={<LockIcon/>} label="Private" variant="outlined" size="small" /> : <Chip icon={<PublicIcon/>} label="Public" variant="outlined" size="small" />

      let header;
      if (this.state.isEditing) {
        header = (
          <Form inline className="py-2">
            <Form.Control
              ref={this.name}
              type="text"
              placeholder="Collection Name"
              className="mr-3"
              value={this.state.name}
              onChange={() => {
                this._setValue("name", this.name.current.value);
              }}>
            </Form.Control>
            <Form.Check
              id="isPrivate"
              type="switch"
              label="Private"
              className="mr-3"
              checked={this.state.isPrivate}
              onChange={() => { this._setSwitchValue("isPrivate") }}
            />
            <Button
              variant="outlined"
              className="mr-3"
              onClick={this._editCollection}
            >Update</Button>
            <IconButton aria-label="cancel" onClick={() => {this.setState({ isEditing: false })}}><CloseIcon/></IconButton>
          </Form>
        );
      } else {
        header = <h1>{collection.data.name} { privacy } {belongsToUser ? <IconButton aria-label="edit" onClick={() => {this._setFormEdit(collection.data)}}><EditIcon/></IconButton> : ''}</h1>;
      }

      let userInfo = (
        <div className="d-inline-flex align-items-center"><Avatar src={collection.data.user.imgFileName} className="mr-1" /> {collection.data.user.username}</div>
      );

      const addGames = (
        <Col>
          <div className="float-md-right"><AddToCollectionSearch/></div>
        </Col>
      );

      body = (
        <div>
          <Row>
            <Col xs={12} md={8}>
              {header}
              {userInfo}
            </Col>
            {belongsToUser ? addGames : ''}
          </Row>
          <BootstrapTable
            keyField="id"
            data={ tableData }
            columns={ tableColumns }
            bordered={ false }
          />
        </div>
      );
    } else if (collection.error) {
      body = <Alert variant="danger">{collection.error}</Alert>;
    } else if (user.error) {
      body = <Alert variant="danger">{collection.error}</Alert>;
    }

    return (
      <div className="collection-wrapper">
        {body}
      </div>
    );
  }
}

export const Collection = connect((state, ownProps) => {
  const { collection, user } = state;
  return {
    collection: collection,
    user: user,
    collectionId: ownProps.match.params.collectionId
  };
}, dispatch => {
  return bindActionCreators({
    getCollection, getSetCollectionState, updateCollection, removeGameFromCollection, resetCollection
  }, dispatch)
})(_Collection)
