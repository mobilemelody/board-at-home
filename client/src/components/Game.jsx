import React from 'react';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Redirect } from "react-router-dom";

import {Reviews} from './Review'


class _Game extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const { game, user } = this.props

        if (!user.isLoggedIn) {
            return <Redirect to='/'/>
        }

        return (
            <div className='Game'>
                <Grid container spacing={3}>
                    <Grid textAlign="left" item xs={12}>
                        <Paper>
                        <h1>{game.data.name}</h1>
                        </Paper>
                        <hr className='GameLine'></hr>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper className='Img'>
                            <img className='ImgCenter' src = {game.data.imgFileName}/>
                            <br/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={6}>Players:</Grid>
                            <Grid item xs={6}>{game.data.minPlayers} - {game.data.maxPlayers}</Grid> 

                            <Grid item xs={6}>Minimum Age:</Grid>
                            <Grid item xs={6}>{game.data.minAge}</Grid> 

                            <Grid item xs={6}>Playtime:</Grid>
                            <Grid item xs={6}>{game.data.minPlaytime} - {game.data.maxPlaytime} minutes</Grid> 

                            <Grid item xs={6}>Publisher:</Grid>
                            <Grid item xs={6}>{game.data.publisher}</Grid> 

                            <Grid item xs={6}>Year Published:</Grid>
                            <Grid item xs={6}>{game.data.year}</Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={12}>
                        <hr className='GameLine'></hr>
                        <Paper  className='Description'>
                            <h5>Description</h5>
                            <p>{game.data.description}</p>
                        </Paper>
                    </Grid>

                    {/* Review Body */}
                    <Reviews/>

                    <Grid item xs={12}>
                        <hr/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export const Game = connect(state => {
    const { game } = state
    const { user } = state
    return { game, user }
}, null)(_Game)
