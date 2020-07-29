import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/AddCircle';
import DotLoader from 'react-spinners/DotLoader';

class _AddToCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      collections: []
    };

    this._openDialog = this._openDialog.bind(this);
    this._closeDialog = this._closeDialog.bind(this);
  }

  componentDidMount() {
    // TODO: Get user collections
    this.setState({ 
      collections: [{
        "id": 1,
        "userID": 1,
        "name": "Owned",
        "isPrivate": false,
        "gameCount": 0,
        "url": "http://localhost:3000/collections/4"
      },{
        "id": 2,
        "userID": 1,
        "name": "Wishlist",
        "isPrivate": true,
        "gameCount": 0,
        "url": "http://localhost:3000/collections/3"
      }],
    });
  }

  _openDialog() {
    this.setState({ open: true });
  };

  _closeDialog() {
    this.setState({ open: false });
  };

  render() {

    let collectionsList = this.state.collections.map(e => 
      <FormControlLabel key={e.id} control={<Checkbox name={e.name} />} label={e.name} />
    );

    let body =
      <div>
        <Button variant="contained" startIcon={<AddIcon/>} size="small" onClick={this._openDialog}>
          Add to Collection
        </Button>
        <Dialog open={this.state.open} onClose={this._closeDialog} aria-labelledby="form-dialog-title">
          <DialogTitle>Add to Collection</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset" className="ml-2">
              {collectionsList}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this._closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this._closeDialog} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>;

    return (
      <div>
        {body}
      </div>
    );
  }
}

export const AddToCollection = connect(null, null)(_AddToCollection)
