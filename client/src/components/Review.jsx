// React, Redux imports
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// Import Actions
import { getGameReviews, updateReview, submitReview, deleteReview, getResetReviewNotif, resetReview } from '../actions/index'
// Component imports
import { Notifier } from './Notifier.jsx'
import * as shared from './shared'
// Other imports
import { Form, InputGroup, Spinner } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import BootstrapTable from 'react-bootstrap-table-next'
import Paper from '@material-ui/core/Paper';
import paginationFactory from 'react-bootstrap-table2-paginator';

// Renders drop-down review details
const ReviewsExpandRow = {
  parentClassName: 'parent-expanded',
  className: 'child-expanded',
  onlyOneExpanding: true,
  onExpand: (row, isExpand, rowIndex, e) => {
    // call function if needed for state
    return rowIndex
  },
  showExpandColumn: true,
  expandColumnPosition: 'right',
  expandColumnRenderer: ({ expanded }) => {
    if (expanded) {
      return (
        <h4>-</h4>
      )
    }
    return (
      <h4>...</h4>
    )
  },
  renderer: row => (
    <Grid container spacing={1}>
      <Grid item md={2}></Grid>
      {/* Star Ratings */}
      <Grid item md={5} xs={12}>
        <Grid item xs={12}><h6>Sub Categories</h6></Grid>
        <Grid container spacing={1} xs={12}>
          <Grid item xs={6}><p>Strategy</p></Grid>
          <Grid item xs={6}>
            <Rating
              value={row.strategy} // Add review state here here
              readOnly
            />
          </Grid>
          <Grid item xs={6}><p>Luck</p></Grid>
          <Grid item xs={6}>
            <Rating
              value={row.luck} // Add review state here here
              readOnly
            />
          </Grid>
          <Grid item xs={6}><p>Player Interaction</p></Grid>
          <Grid item xs={6}>
            <Rating
              value={row.playerInteraction} // Add review state here here
              readOnly
            />
          </Grid>
          <Grid item xs={6}><p>Replay Value</p></Grid>
          <Grid item xs={6}>
            <Rating
              value={row.replayValue} // Add review state here here
              readOnly
            />
          </Grid>
          <Grid item xs={6}><p>Complexity</p></Grid>
          <Grid item xs={6}>
            <Rating
              value={row.complexity} // Add review state here here
              readOnly
            />
          </Grid>
          <Grid item xs={6}><p>Art & Style</p></Grid>
          <Grid item xs={6}>
            <Rating
              value={row.artAndStyle} // Add review state here here
              readOnly
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Checkbox Good For */}
      <Grid item md={5} xs={12}>
        <Grid item xs={12}><h6>Good For</h6></Grid>
        <Grid container spacing={1} xs={12}>
          <Grid item xs={6}><p>Families</p></Grid>
          <Grid item xs={6}>
            <Checkbox
              checked={row.gfFamilies}
              disableRipple
              color='default'
              size='small'
            />
          </Grid>
          <Grid item xs={6}><p>Adults</p></Grid>
          <Grid item xs={6}>
            <Checkbox
              checked={row.gfAdults}
              disableRipple
              color='default'
              size='small'
            />
          </Grid>
          <Grid item xs={6}><p>Teens</p></Grid>
          <Grid item xs={6}>
            <Checkbox
              checked={row.gfTeens}
              disableRipple
              color='default'
              size='small'
            />
          </Grid>
          <Grid item xs={6}><p>Kids</p></Grid>
          <Grid item xs={6}>
            <Checkbox
              checked={row.gfKids}
              disableRipple
              color='default'
              size='small'
            />
          </Grid>
          <Grid item xs={6}><p>2 Players</p></Grid>
          <Grid item xs={6}>
            <Checkbox
              checked={row.gf2Player}
              disableRipple
              color='default'
              size='small'
            />
          </Grid>
          <Grid item xs={6}><p>Large Groups</p></Grid>
          <Grid item xs={6}>
            <Checkbox
              checked={row.gfLargeGroups}
              disableRipple
              color='default'
              size='small'
            />
          </Grid>
          <Grid item xs={6}><p>Social Distancing</p></Grid>
          <Grid item xs={6}>
            <Checkbox
              checked={row.gfSocialDistancing}
              disableRipple
              color='default'
              size='small'
            />
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  )
}

// ------------------------------------
// Review Class
// Renders user and other users reviews in game page
// ------------------------------------
class _Reviews extends React.Component {
  constructor(props) {
    super(props)
    this._submitReview = this._submitReview.bind(this)
    this._deleteReview = this._deleteReview.bind(this)
    this._setValue = this._setValue.bind(this)
    this._setCheckBoxValue = this._setCheckBoxValue.bind(this)
    this._setFormState = this._setFormState.bind(this)
    this._setFormEdit = this._setFormEdit.bind(this)
    this._resetNotif = this._resetNotif.bind(this)

    // Local state for form data
    this.state = {
      userID: 1,  // fix this later
      id: null,
      editReview: false,
      deleteReview: false,
      overallRating: 0,
      comments: "",
      strategy: 0,
      luck: 0,
      playerInteraction: 0,
      replayValue: 0,
      complexity: 0,
      artAndStyle: 0,
      gfKids: false,
      gfTeens: false,
      gfAdults: false,
      gfFamilies: false,
      gf2Player: false,
      gfLargeGroups: false,
      gfSocialDistancing: false,
    }
    this.comments = React.createRef()
  }

  // Get reviews when component loads
  componentDidMount() {
    this.props.resetReview()
    this.props.getGameReviews()
  }

  _resetNotif() {
    this.props.getResetReviewNotif()
  }

  // Sets value for form
  _setValue(key, value) {
    this.setState({
      [key]: value,
    })
  }

  // Set Form State from game.userReview
  _setFormState(userReview) {
    // Iterate over entries
    for (const [key, value] of Object.entries(userReview)) {
      this._setValue(key, value)
    }
  }

  // Switches boolean value when triggered
  _setCheckBoxValue(key) {
    const value = this.state[key]

    this.setState({
      [key]: !value,
    })
  }

  // Submits review
  _submitReview() {
    this.setState({ editReview: false })

    const review = {
      overallRating: this.state.overallRating,
      comments: this.state.comments,
      strategy: this.state.strategy,
      luck: this.state.luck,
      playerInteraction: this.state.playerInteraction,
      replayValue: this.state.replayValue,
      complexity: this.state.complexity,
      artAndStyle: this.state.artAndStyle,
      gfKids: this.state.gfKids,
      gfTeens: this.state.gfTeens,
      gfAdults: this.state.gfAdults,
      gfFamilies: this.state.gfFamilies,
      gf2Player: this.state.gf2Player,
      gfLargeGroups: this.state.gfLargeGroups,
      gfSocialDistancing: this.state.gfSocialDistancing
    }

    if (this.state.editReview) {
      review.id = this.state.id
      this.props.updateReview(review)
    } else {
      this.props.submitReview(review)
    }
  }

  _deleteReview(review) {
    this.props.deleteReview(review)
  }


  _setFormEdit(userReview) {
    this.setState({ editReview: true })
    this._setFormState(userReview)
  }


  render() {

    const { reviews, user } = this.props

    var formDisabled = false
    var tableData = []
    var notifier = <div />

    if (user.isNew || user.isFetching) {
      return (
        <div className="spinner-wrapper">
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        </div>
      )
    }

    if (reviews.userReviewed && !this.state.editReview) {
      formDisabled = true
    }

    if (reviews.notifType !== null) {
      notifier = <Notifier type={reviews.notifType} />

      this._resetNotif()
    }

    // Push reviews to table data
    reviews.rows.forEach(function (review) {
      tableData.push({
        id: review.id,
        reviewViewer:
          <Grid container spacing={1}>
            <Grid item md={2} xs={6}>
              <Paper className='ImgReview'>
                <img alt="user profile pic" className='ImgCenterReview' src={review.user.imgFileName} />
              </Paper>
            </Grid>
            <Grid item md={3} xs={6}>
              <h5>{review.user.username}</h5>
              <hr />
              <h6>Overall Rating</h6>
              <Rating
                name="overallRating"
                value={review.overallRating}
                readOnly
              />
            </Grid>
            <Grid item md={7} xs={12} className="CommentsWrapper">
              <h6>Comments</h6>
              <p className="CommentsP bg-light p-2 overflow-auto">
                {review.comments}
              </p>
            </Grid>
          </Grid>,
        // Hidden columns that show in expand renderer
        strategy: review.strategy,
        luck: review.luck,
        playerInteraction: review.playerInteraction,
        replayValue: review.replayValue,
        complexity: review.complexity,
        artAndStyle: review.artAndStyle,
        gfAdults: review.gfAdults,
        gfTeens: review.gfTeens,
        gfKids: review.gfKids,
        gfFamilies: review.gfFamilies,
        gf2Player: review.gf2Player,
        gfLargeGroups: review.gfLargeGroups,
        gfSocialDistancing: review.gfSocialDistancing
      })
    })

    return (
      <div className="Review-Wrapper pt-5">
        {notifier}
        <Grid item xs={12}>
          {/* Review heading */}
          {(() => {
            if (formDisabled && !this.state.editReview) {
              return <h3>Your Review</h3>
            } else if (this.state.editReview) {
              return <h3>Edit Review</h3>
            } else {
              return <h3>Add a Review</h3>
            }
          })()}
          <hr className='GameLine'></hr>
          <div className="Form-Wrapper">
            <Form>
              <Grid container spacing={2}>
                {/* Star Ratings */}
                <Grid item md={6} xs={12}>
                  <fieldset disabled={formDisabled}>
                    <h5>Ratings</h5>
                    <br />
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <p>Overall Rating</p>
                      </Grid>
                      <Grid item xs={6}>
                        <Rating
                          name="overallRating"
                          value={formDisabled ? reviews.userReview.overallRating : this.state.overallRating}
                          onChange={(event, newValue) => {
                            this._setValue("overallRating", newValue);
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <p>Strategy</p>
                      </Grid>
                      <Grid item xs={6}>
                        <Rating
                          name="strategy"
                          value={formDisabled ? reviews.userReview.strategy : this.state.strategy}
                          onChange={(event, newValue) => {
                            this._setValue("strategy", newValue);
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <p>Luck</p>
                      </Grid>
                      <Grid item xs={6}>
                        <Rating
                          name="luck"
                          value={formDisabled ? reviews.userReview.luck : this.state.luck}
                          onChange={(event, newValue) => {
                            this._setValue("luck", newValue);
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <p>Player Interaction</p>
                      </Grid>
                      <Grid item xs={6}>
                        <Rating
                          name="playerInteraction"
                          value={formDisabled ? reviews.userReview.playerInteraction : this.state.playerInteraction}
                          onChange={(event, newValue) => {
                            this._setValue("playerInteraction", newValue);
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <p>Replay Value</p>
                      </Grid>
                      <Grid item xs={6}>
                        <Rating
                          name="replayValue"
                          value={formDisabled ? reviews.userReview.replayValue : this.state.replayValue}
                          onChange={(event, newValue) => {
                            this._setValue("replayValue", newValue);
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <p>Complexity</p>
                      </Grid>
                      <Grid item xs={6}>
                        <Rating
                          name="complexity"
                          value={formDisabled ? reviews.userReview.complexity : this.state.complexity}
                          onChange={(event, newValue) => {
                            this._setValue("complexity", newValue);
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <p>Art & Style</p>
                      </Grid>
                      <Grid item xs={6}>
                        <Rating
                          name="artAndStyle"
                          value={formDisabled ? reviews.userReview.artAndStyle : this.state.artAndStyle}
                          onChange={(event, newValue) => {
                            this._setValue("artAndStyle", newValue);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </fieldset>
                </Grid>

                {/* Good For */}
                <Grid item md={6} xs={12}>
                  <fieldset disabled={formDisabled}>
                    <h5>Good For</h5>
                    <br />
                    <Grid container spacing={1}>
                      <Grid item xs={8}>
                        <p>Families</p>
                      </Grid>
                      <Grid item xs={4}>
                        <Form.Group id="formGridCheckboxFamilies">
                          <Form.Check
                            size="lg"
                            type="checkbox"
                            checked={formDisabled ? reviews.userReview.gfFamilies : this.state.gfFamilies}
                            id="gfFamilies"
                            onChange={() => { this._setCheckBoxValue("gfFamilies") }}
                          />
                        </Form.Group>
                      </Grid>
                      <Grid item xs={8}>
                        <p>Adults</p>
                      </Grid>
                      <Grid item xs={4}>
                        <Form.Group id="formGridCheckboxAdults">
                          <Form.Check
                            size="lg"
                            type="checkbox"
                            checked={formDisabled ? reviews.userReview.gfAdults : this.state.gfAdults}
                            id="gfAdults"
                            onChange={() => { this._setCheckBoxValue("gfAdults") }}
                          />
                        </Form.Group>
                      </Grid>
                      <Grid item xs={8}>
                        <p>Teens</p>
                      </Grid>
                      <Grid item xs={4}>
                        <Form.Group id="formGridCheckboxTeens">
                          <Form.Check
                            size="lg"
                            type="checkbox"
                            checked={formDisabled ? reviews.userReview.gfTeens : this.state.gfTeens}
                            id="gfTeens"
                            onChange={() => { this._setCheckBoxValue("gfTeens") }}
                          />
                        </Form.Group>
                      </Grid>
                      <Grid item xs={8}>
                        <p>Kids</p>
                      </Grid>
                      <Grid item xs={4}>
                        <Form.Group id="formGridCheckboxKids">
                          <Form.Check
                            size="lg"
                            type="checkbox"
                            checked={formDisabled ? reviews.userReview.gfKids : this.state.gfKids}
                            id="gfKids"
                            onChange={() => { this._setCheckBoxValue("gfKids") }}
                          />
                        </Form.Group>
                      </Grid>
                      <Grid item xs={8}>
                        <p>2 Players</p>
                      </Grid>
                      <Grid item xs={4}>
                        <Form.Group id="formGridCheckbox2Player">
                          <Form.Check
                            size="lg"
                            type="checkbox"
                            checked={formDisabled ? reviews.userReview.gf2Player : this.state.gf2Player}
                            id="gf2Player"
                            onChange={() => { this._setCheckBoxValue("gf2Player") }}
                          />
                        </Form.Group>
                      </Grid>
                      <Grid item xs={8}>
                        <p>Large Groups</p>
                      </Grid>
                      <Grid item xs={4}>
                        <Form.Group id="formGridCheckboxLargeGroups">
                          <Form.Check
                            size="lg"
                            type="checkbox"
                            checked={formDisabled ? reviews.userReview.gfLargeGroups : this.state.gfLargeGroups}
                            id="gfLargeGroups"
                            onChange={() => { this._setCheckBoxValue("gfLargeGroups") }}
                          />
                        </Form.Group>
                      </Grid>
                      <Grid item xs={8}>
                        <p>Social Distancing</p>
                      </Grid>
                      <Grid item xs={4}>
                        <Form.Group id="formGridCheckboxSocialDistancing">
                          <Form.Check
                            size="lg"
                            type="checkbox"
                            checked={formDisabled ? reviews.userReview.gfSocialDistancing : this.state.gfSocialDistancing}
                            id="gfSocialDistancing"
                            onChange={() => { this._setCheckBoxValue("gfSocialDistancing") }}
                          />
                        </Form.Group>
                      </Grid>
                    </Grid>
                  </fieldset>
                </Grid>
                <Grid item xs={12}>
                  <fieldset disabled={formDisabled}>
                    <h5>Comments</h5>
                    <InputGroup>
                      <Form.Control
                        as="textarea"
                        aria-label="With textarea"
                        ref={this.comments}
                        value={formDisabled ? reviews.userReview.comments : this.state.comments}
                        onChange={() => { this._setValue("comments", this.comments.current.value) }}
                      />
                    </InputGroup>
                  </fieldset>
                </Grid>
                {formDisabled ?
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      className="mr-2"
                      onClick={() => {
                        this._setFormEdit(reviews.userReview)
                      }}
                    >&nbsp;Edit&nbsp;</Button>
                    <Button
                      variant="outlined"
                      color="default"
                      onClick={() => {
                        this._deleteReview(reviews.userReview)
                      }}
                    >Delete</Button>
                  </Grid>
                  :
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        this._submitReview()
                      }}

                    >Submit</Button>
                  </Grid>
                }
              </Grid>
            </Form>
          </div>
        </Grid>
        {/* Other Reviews Table */}
        <Grid item xs={12} className="pt-5">
          <h3>Other Reviews</h3>
          <div className="ReviewTable">
            <BootstrapTable
              keyField="id"
              data={tableData}
              columns={shared.ReviewsColumns}
              expandRow={ReviewsExpandRow}
              bordered={false}
              pagination={paginationFactory(shared.PaginationOptions)}
            />
          </div>
        </Grid>
      </div>
    )
  }
}

export const Reviews = connect(state => {
  const { reviews, user } = state
  return { reviews, user  }
}, dispatch => {
  return bindActionCreators({
    getGameReviews, updateReview, submitReview, deleteReview, getResetReviewNotif, resetReview
  }, dispatch)
})(_Reviews)
