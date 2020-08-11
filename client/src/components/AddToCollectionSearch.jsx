// React, Redux imports
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
// Action imports
import { getCollection, getGames, addGameToCollection, removeGameFromCollection } from '../actions/index';
// Other imports
import { Modal } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';


// Column names for table of games
const tableColumns = [{
  dataField: 'id',
  text: 'Game ID',
  hidden: true,
  searchable: false
}, {
  dataField: 'name',
  text: '',
  hidden: true
}, {
  dataField: 'gameInfo',
  text: 'Search results:',
  searchable: false,
  headerStyle: { fontWeight: 'bold' }
}, {
  dataField: 'actionButton',
  text: '',
  searchable: false,
  align: 'center',
  style: { verticalAlign: 'middle' }
}];

// Set custom pagination
const GamesPaginationOptions = {
  paginationSize: 5,
  pageStartIndex: 1,
  hideSizePerPage: true,
  hidePageListOnlyOnePage: true,
  withFirstAndLast: false,
  alwaysShowAllBtns: true,
  showTotal: false,
  disablePageTitle: true,
  sizePerPageList: [{
    text: '5', value: 5
  }]
};

// ------------------------------------
// Add to Collection Search Class 
// Implements Collec
// ------------------------------------
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
    const { SearchBar } = Search;

    let gamesList = [];

    if (games.isReceived && !games.error) {

      // Create list of games
      let gamesInCollection = collection.data.games.map(e => e.id);
      gamesList = games.rows.map(e => {
        return {
          id: e.id,
          name: e.name,
          gameInfo: <a href={e.url}><img alt="game cover" src={e.imgFileName} height="50"/> {e.name}</a>,
          actionButton: (
            <div className="float-md-right">
              {gamesInCollection.includes(e.id) ?
                <Button variant="contained" onClick={() => {this._removeFromCollection(e.id)}}>Remove Game</Button>:
                <Button variant="outlined" onClick={() => {this._addToCollection(e.id)}}>Add Game</Button>}
            </div>
          )
        }
      });

    }

    // Modal dialog content
    let body =
      <div>
        <Button
          variant="outlined"
          startIcon={<AddIcon/>}
          size="medium"
          className="mt-2"
          onClick={this._openDialog}
          >Add Games</Button>
        <Modal size="lg" show={this.state.open} onHide={this._closeDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Add Games</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ToolkitProvider
              keyField="id"
              data={ gamesList }
              columns={ tableColumns }
              search
            >
            {props => {
              props.baseProps.pagination = paginationFactory(GamesPaginationOptions);
              props.baseProps.bordered = false;
              return (
                <div>
                  <SearchBar {...props.searchProps} />
                  <BootstrapTable { ...props.baseProps } className="table-borderless" />
                </div>
              )}}
            </ToolkitProvider>
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
