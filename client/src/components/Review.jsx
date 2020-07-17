import React from 'react';
import { connect } from 'react-redux'

// Import Actions
import { } from '../actions/index'

import {Form, Button, InputGroup} from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Checkbox from '@material-ui/core/Checkbox';

import Typography from '@material-ui/core/Typography';
import BootstrapTable from 'react-bootstrap-table-next'
import Paper from '@material-ui/core/Paper';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
        Showing { from } to { to } of { size } Results
    </span>
)

const expandRow = {
    parentClassName: 'parent-expanded',
    className: 'child-expanded',
    onlyOneExpanding: true,
    onExpand: (row, isExpand, rowIndex, e) => {
        // call function if needed for state
        console.log(row)
        return rowIndex
    },
    showExpandColumn: true,
    expandColumnPosition: 'right',
    expandColumnRenderer: ({ expanded }) => {
        if (expanded) {
            return (
                <Typography variant="h4">-</Typography>
            )
        }
        return (
            <Typography variant="h4">...</Typography>
        )
    },
    renderer: row => (
        <Grid container spacing={1}>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}><h6>Sub Categories</h6></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={5}><h6>Good For</h6></Grid>
            {/* Star Ratings */}
            <Grid item xs={6}>
                <Grid container spacing={1}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}><p>Strategy</p></Grid>
                    <Grid item xs={4}>
                        <Rating
                            value={5} // Add review state here here
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}><p>Luck</p></Grid>
                    <Grid item xs={4}>
                        <Rating
                            value={5} // Add review state here here
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}><p>Player Interaction</p></Grid>
                    <Grid item xs={4}>
                        <Rating
                            value={5} // Add review state here here
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}><p>Replay Value</p></Grid>
                    <Grid item xs={4}>
                        <Rating
                            value={5} // Add review state here here
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}><p>Complexity</p></Grid>
                    <Grid item xs={4}>
                        <Rating
                            value={5} // Add review state here here
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}><p>Art & Style</p></Grid>
                    <Grid item xs={4}>
                        <Rating
                            value={5} // Add review state here here
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            
            {/* Checkbox Good For */}
            <Grid item xs={6}>
                <Grid container spacing={1}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}><p>Families</p></Grid>
                    <Grid item xs={4}>
                        <Checkbox
                            checked={true}
                            disableRipple
                            color='default'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}><p>Adults</p></Grid>
                    <Grid item xs={4}>
                        <Checkbox
                            checked={true}
                            disableRipple
                            color='default'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}><p>Teens</p></Grid>
                    <Grid item xs={4}>
                        <Checkbox
                            checked={false}
                            disableRipple
                            color='default'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}><p>Kids</p></Grid>
                    <Grid item xs={4}>
                        <Checkbox
                            checked={false}
                            disableRipple
                            color='default'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}><p>2 Players</p></Grid>
                    <Grid item xs={4}>
                        <Checkbox
                            checked={true}
                            disableRipple
                            color='default'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}><p>Large Groups</p></Grid>
                    <Grid item xs={4}>
                        <Checkbox
                            checked={true}
                            disableRipple
                            color='default'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}><p>Social Distancing</p></Grid>
                    <Grid item xs={4}>
                        <Checkbox
                            checked={true}
                            disableRipple
                            color='default'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                </Grid>
            </Grid>
        </Grid>
    )
}


class _UserReview extends React.Component {
    constructor(props) {
        super(props)
        this._submitReview = this._submitReview.bind(this)
        this._deleteReview = this._deleteReview.bind(this)
        this._setValue = this._setValue.bind(this)
        this._setCheckBoxValue = this._setCheckBoxValue.bind(this)
        this._setFormState = this._setFormState.bind(this)
        this._setFormEdit = this._setFormEdit.bind(this)

        // Local state for form data
        this.state = {
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
        console.log(key, !value)
    }

    // Submits review
    _submitReview() {
        const review = this.state

        if (review.editReview) {
            console.log('edit review')
        } else {
            console.log("submit review")
        }
        // console.log(review)

        this.props.submitReviewFetch()
        this.props.submitReview(review)
    }

    _deleteReview(review) {
        console.log("delete review")
        console.log(review)
        
        this.props.submitReviewFetch()
        this.props.deleteReview(review)
    }


    _setFormEdit(userReview) {
        this.setState({editReview: true})
        this._setFormState(userReview)
    }


    render() {

        const { game } = this.props
        const { reviews } = this.props
        var userReviewed = false

        if (game.userReviewed && !this.state.editReview) {
            userReviewed = true
        }

        return (
            <Grid item xs={12}>
                <h3>Add a Review</h3>
                <hr className='GameLine'></hr>
                <div className="Review-Wrapper">
                    <Form>
                            <Grid container spacing={2}>
                                {/* Star Ratings */}
                                <Grid item xs={6}>
                                    <fieldset disabled={userReviewed}>
                                    <Typography>Ratings</Typography>
                                    <br/>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <p>Overall Rating</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Rating
                                                name="overallRating"
                                                value={userReviewed ? game.userReview.overallRating : this.state.overallRating}
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
                                                value={userReviewed ? game.userReview.strategy : this.state.strategy}
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
                                                value={userReviewed ? game.userReview.luck : this.state.luck}
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
                                                value={userReviewed ? game.userReview.playerInteraction : this.state.playerInteraction}
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
                                                value={userReviewed ? game.userReview : this.state.replayValue}
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
                                                value={userReviewed ? game.userReview.complexity: this.state.complexity}
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
                                                value={userReviewed ? game.userReview.artAndStyle : this.state.artAndStyle}
                                                onChange={(event, newValue) => {
                                                    this._setValue("artAndStyle", newValue);
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    </fieldset>
                                </Grid>

                                {/* Good For */}
                                <Grid item xs={6}>
                                    <fieldset disabled={userReviewed}>
                                    <Typography>Good For</Typography>
                                    <br/>
                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <p>Families</p>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Form.Group id="formGridCheckboxFamilies">
                                                <Form.Check 
                                                    size="lg"
                                                    type="checkbox"
                                                    checked={userReviewed ? game.userReview.gfFamilies : this.state.gfFamilies} 
                                                    id="gfFamilies" 
                                                    onChange={() => { this._setCheckBoxValue("gfFamilies")}}
                                                />
                                            </Form.Group>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <p>Adults</p>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Form.Group id="formGridCheckboxAdults">
                                                <Form.Check 
                                                    size="lg"
                                                    type="checkbox" 
                                                    checked={userReviewed ? game.userReview.gfAdults : this.state.gfAdults} 
                                                    id="gfAdults" 
                                                    onChange={() => { this._setCheckBoxValue("gfAdults")}}
                                                />
                                            </Form.Group>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <p>Teens</p>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Form.Group id="formGridCheckboxTeens">
                                                <Form.Check 
                                                    size="lg"
                                                    type="checkbox" 
                                                    checked={userReviewed ? game.userReview.gfTeens : this.state.gfTeens}
                                                    id="gfTeens" 
                                                    onChange={() => { this._setCheckBoxValue("gfTeens")}}
                                                />
                                            </Form.Group>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <p>Kids</p>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Form.Group id="formGridCheckboxKids">
                                                <Form.Check 
                                                    size="lg"
                                                    type="checkbox" 
                                                    checked={userReviewed ? game.userReview.gfKids : this.state.gfKids}
                                                    id="gfKids" 
                                                    onChange={() => { this._setCheckBoxValue("gfKids")}}
                                                />
                                            </Form.Group>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <p>2 Players</p>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Form.Group id="formGridCheckbox2Player">
                                                <Form.Check 
                                                    size="lg"
                                                    type="checkbox" 
                                                    checked={userReviewed ? game.userReview.gf2Player : this.state.gf2Player}
                                                    id="gf2Player" 
                                                    onChange={() => { this._setCheckBoxValue("gf2Player")}}
                                                />
                                            </Form.Group>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <p>Large Groups</p>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Form.Group id="formGridCheckboxLargeGroups">
                                                <Form.Check 
                                                    size="lg"
                                                    type="checkbox" 
                                                    checked={userReviewed ? game.userReview.gfLargeGroups : this.state.gfLargeGroups}
                                                    id="gfLargeGroups" 
                                                    onChange={() => { this._setCheckBoxValue("gfLargeGroups")}}
                                                />
                                            </Form.Group>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <p>Social Distancing</p>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Form.Group id="formGridCheckboxSocialDistancing">
                                                <Form.Check 
                                                    size="lg"
                                                    type="checkbox" 
                                                    checked={userReviewed ? game.userReview.gfSocialDistancing : this.state.gfSocialDistancing}
                                                    id="gfSocialDistancing"
                                                    onChange={() => { this._setCheckBoxValue("gfSocialDistancing")}}
                                                />
                                            </Form.Group>
                                        </Grid>
                                    </Grid>
                                    </fieldset>
                                </Grid>
                                <Grid item xs={12}>
                                    <fieldset disabled={userReviewed}>
                                    <Typography>Comments</Typography>
                                    <InputGroup>
                                        <Form.Control 
                                            as="textarea"
                                            aria-label="With textarea"
                                            ref={this.comments}
                                            value={userReviewed ? game.userReview.comments : this.comments.current.value}
                                            onChange={() => {this._setValue("comments", this.comments.current.value)}}
                                        />
                                    </InputGroup>
                                    </fieldset>
                                </Grid>
                                { userReviewed ? 
                                    <Grid item xs={12}>
                                        <Button 
                                            variant="primary"
                                            onClick={() => {
                                                this._setFormEdit(game.userReview)
                                            }}
                                        >&nbsp;Edit&nbsp;</Button>
                                        <Button 
                                            variant="primary"
                                            onClick={() => {
                                                this._deleteReview(game.userReview)
                                            }}
                                        >Delete</Button>
                                    </Grid>
                                    :
                                    <Grid item xs={12}>
                                        <Button 
                                        variant="primary" 
                                        type="submit"
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
        )
    }
}

export const UserReview = connect(state => {
    const { game } = state
    return { game }
}, null)(_UserReview)

class _Reviews extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        const { game } = this.props

        const columns = [{
            dataField: 'id',
            text: '',
            hidden: true
        }, {
            dataField: 'img',
            classes: 'UserImg',
            text: '',
            }, {
            dataField: 'userAndRating',
            classes: 'UserAndRating',
            text: '',
            }, {
            dataField: 'comments',
            classes: 'Comments',
            text: '',
            }
        ];

        const products = [{
            id: 1,
            img: 
                <Paper className='ImgReview'>
                    <img className='ImgCenterReview' src = {"https://boardathome.s3.us-east-2.amazonaws.com/user/test.jpg"}/>
                </Paper>,
            userAndRating: 
                <div>
                    <Typography>lifeIsAGame</Typography>
                    <hr/>
                    <p>Overall Rating</p>
                    <Rating
                        name="overallRating"
                        value={1}
                        readOnly
                    />
                </div>,
            comments:
                <div className="CommentsWrapper">
                    <h6>Comments</h6>
                    <p className="CommentsP">
                        DO NOT BUY THIS GAME. I reached out to the publisher asking for a free game in exchange for exposure on my Instagram page. They had the audacity to tell me NO! I'm boycotting spending my hard earned exposure on this publisher!
                    </p>
                </div>
            },{      
            id: 2,      
            img: 
                <Paper className='ImgReview'>
                    <img className='ImgCenterReview' src = {"https://boardathome.s3.us-east-2.amazonaws.com/user/test.jpg"}/>
                </Paper>,
            userAndRating: 
                <div>
                    <Typography>boardGameGoblin</Typography>
                    <hr/>
                    <p>Overall Rating</p>
                    <Rating
                        name="overallRating"
                        value={5}
                        readOnly
                    />
                </div>,
            comments:
                <div className="CommentsWrapper">
                    <h6>Comments</h6>
                    <p className="CommentsP">
                        I really enjoyed this game with my kids. 
                    </p>
                </div>
            }
        ]

        const paginationOptions = {
            paginationSize: 5,
            pageStartIndex: 1,
            // withFirstAndLast: false, // Hide the going to First and Last page button
            hideSizePerPage: true, // Hide the sizePerPage dropdown always
            hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            disablePageTitle: true,
            sizePerPageList: [{
                text: '5', value: 5
            }]
        };

        return (
            <Grid item xs={12}>
                <h3>Reviews</h3>
                <div className="ReviewTable">
                    <BootstrapTable
                        keyField="id"
                        data={ products }
                        columns={ columns }
                        expandRow={ expandRow }
                        bordered={ false }
                        pagination={ paginationFactory(paginationOptions) }
                    />
                </div>
            </Grid>
        )
    }
}

export const Reviews = connect(state => {
    const { game } = state
    return { game }
}, null)(_Reviews)
