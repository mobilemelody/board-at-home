// React, Redux imports
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
// Action imports
import { addGameToCollection, removeGameFromCollection, createCollection, getUserCollections, resetCollection } from '../actions/index'
// Other Imports
import { Modal, Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';
import LockIcon from '@material-ui/icons/Lock';

// ------------------------------------
// Add to Collection Class 
// Renders form for adding game to collection
// ------------------------------------
class _AddToCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isAdding: false,
      name: '',
      isPrivate: false,
    };

    this._openDialog = this._openDialog.bind(this);
    this._closeDialog = this._closeDialog.bind(this);
    this._handleCollectionChange = this._handleCollectionChange.bind(this);
    this._setFormAdd = this._setFormAdd.bind(this);
    this._setValue = this._setValue.bind(this);
    this._setSwitchValue = this._setSwitchValue.bind(this);
    this._saveCollection = this._saveCollection.bind(this);

    this.name = React.createRef();
  }

  componentDidMount() {
    this.props.getUserCollections();
  }

  componentWillUnmount() {
    this.props.resetCollection();
  }

  _openDialog() {
    this.setState({ open: true });
  }

  _closeDialog() {
    this.setState({ open: false });
  }

  _handleCollectionChange(collection, checked) {
    if (checked) {
      this.props.removeGameFromCollection(collection, null)
        .then(res => {
          this.props.getUserCollections();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.props.addGameToCollection(collection, null)
        .then(res => {
          this.props.getUserCollections();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  _setFormAdd() {
    this.setState({ isAdding: true });
  }

  _setValue(key, value) {
    this.setState({ [key]: value });
  }

  _setSwitchValue(key) {
    const value = this.state[key];
    this.setState({ [key]: !value });
  }

  _saveCollection() {
    // Create collection from form values
    let collection = {
      name: this.state.name,
      isPrivate: this.state.isPrivate
    };
    this.props.createCollection(collection)
      .then(res => {
        this.props.getUserCollections();
      })
      .catch(err => {
        console.log(err);
      });

    // Reset form values
    this.setState({
      name: '',
      isPrivate: false
    });
  }

  render() {

    let { collections, game } = this.props.state;

    let addCollection = '';
    let collectionsList = [];
    let modalBody;

    // collections received without error
    if (collections.isReceived && !collections.error) {
      
      // Create list of collections
      collectionsList = collections.data.collections.map(e => 
        <Form.Check
          ref={e.id}
          key={e.id}
          className="py-1"
        >
          <Form.Check.Input
            checked={e.gameIDs.includes(game.data.id)}
            onChange={() => { this._handleCollectionChange(e, e.gameIDs.includes(game.data.id)) }}
          />
          <Form.Check.Label>
            {e.name} {e.isPrivate ? <LockIcon style={{ fontSize: '1rem' }} className="mb-1" /> : ''}
          </Form.Check.Label>
        </Form.Check>
      );

      // Form to add new collection
      if (this.state.isAdding) {
        addCollection =
          <Form inline>
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
              onClick={this._saveCollection}
            >Add</Button>
          </Form>
      } else {
        // add new collection
        addCollection =
          <Button startIcon={<AddIcon/>} onClick={this._setFormAdd}>
            Add Collection
          </Button>
      }

      modalBody =
        <div>
          {collectionsList}
          {addCollection}
        </div>
    }

    // Modal dialog content
    let body =
      <div>
        <Button variant="outlined" startIcon={<AddIcon/>} size="medium" onClick={this._openDialog}>
          Add to Collection
        </Button>
        <Modal show={this.state.open} onHide={this._closeDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Add to Collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalBody}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._closeDialog} color="primary">
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>;

    return (
      <div>
        {body}
      </div>
    );
  }
}

export const AddToCollection = connect(state => {
  const { collection, collections, game } = state;
  return { state: { collection, collections, game } };
}, dispatch => {
  return bindActionCreators({
    addGameToCollection, removeGameFromCollection, createCollection, getUserCollections, resetCollection
  }, dispatch)
})(_AddToCollection)
