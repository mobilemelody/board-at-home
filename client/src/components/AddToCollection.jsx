import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Modal, Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';
import DotLoader from 'react-spinners/DotLoader';

import { addGameToCollection, removeGameFromCollection, createCollection, getUserCollections } from '../actions/index'

class _AddToCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isAdding: false,
      name: '',
      isPrivate: false,
      collections: []
    };

    this._openDialog = this._openDialog.bind(this);
    this._closeDialog = this._closeDialog.bind(this);
    this._setFormAdd = this._setFormAdd.bind(this);
    this._setValue = this._setValue.bind(this);
    this._setSwitchValue = this._setSwitchValue.bind(this);
    this._saveCollection = this._saveCollection.bind(this);

    this.name = React.createRef();
  }

  componentDidMount() {
    this.props.getUserCollections();
    console.log(this.props.rows);
  }

  _openDialog() {
    this.setState({ open: true });
  }

  _closeDialog() {
    this.setState({ open: false });
  }

  _addGameToCollection(collection){
    // TODO: save game to collection
  }

  _removeGameFromCollection() {
    // TODO: remove game from collection
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
    let collection = {
      name: this.state.name,
      isPrivate: this.state.isPrivate
    };
    this.props.createCollection(collection);
  }

  render() {

    let { collections } = this.props.state;

    let addCollection = '';
    let collectionsList = [];

    if (collections.isReceived && !collections.error) {
      collectionsList = collections.data.collections.map(e => 
        <Form.Check key={e.id} label={e.name} className="py-1" />
      );

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
        addCollection =
          <Button startIcon={<AddIcon/>} onClick={this._setFormAdd}>
            Add Collection
          </Button>
      }
    }

    let body =
      <div>
        <Button variant="contained" startIcon={<AddIcon/>} size="small" onClick={this._openDialog}>
          Add to Collection
        </Button>
        <Modal show={this.state.open} onHide={this._closeDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Add to Collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {collectionsList}
            {addCollection}
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
  const { collection, collections } = state;
  return { state: { collection, collections } };
}, dispatch => {
  return bindActionCreators({
    addGameToCollection, removeGameFromCollection, createCollection, getUserCollections
  }, dispatch)
})(_AddToCollection)
