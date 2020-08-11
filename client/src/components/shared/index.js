import React from 'react';

// Show page total at bottom of bootstrap table
export const PageTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing { from} to { to} of { size} Results
  </span>
)

// Set custom bootstrap table pagination
export const PaginationOptions = {
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
  paginationTotalRenderer: PageTotal,
  disablePageTitle: true,
  sizePerPageList: [{
    text: '5', value: 5
  }]
};

// Games columns
export const GamesColumns = [{
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

// Reviews table
export const ReviewsColumns = [{
  dataField: 'id',
  text: '',
  hidden: true
}, {
  dataField: 'reviewViewer',
  text: '',
}, {
  dataField: 'strategy',
  text: '',
  hidden: true,
}, {
  dataField: 'luck',
  text: '',
  hidden: true,
}, {
  dataField: 'playerInteraction',
  text: '',
  hidden: true,
}, {
  dataField: 'replayValue',
  text: '',
  hidden: true,
}, {
  dataField: 'complexity',
  text: '',
  hidden: true,
}, {
  dataField: 'artAndStyle',
  text: '',
  hidden: true,
}, {
  dataField: 'gfKids',
  text: '',
  hidden: true,
}, {
  dataField: 'gfTeens',
  text: '',
  hidden: true,
}, {
  dataField: 'gfFamilies',
  text: '',
  hidden: true,
}, {
  dataField: 'gf2Player',
  text: '',
  hidden: true,
}, {
  dataField: 'gfLargeGroups',
  text: '',
  hidden: true,
}, {
  dataField: 'gfSocialDistancing',
  text: '',
  hidden: true,
}];