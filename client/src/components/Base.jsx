// React Redux Imports
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// RC Dealer App Component Imports
import { App } from "./App"
import AddGame from './AddGame'

/*************************************
** Base Component
** Routes to App
**************************************/

export class Base extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main-wrapper">
        <Route exact path='/' component={App} />
        <Route path='/games/add' component={AddGame} />
      </div>
    )
  }
}