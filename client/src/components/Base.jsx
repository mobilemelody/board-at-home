// React Redux Imports
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// RC Dealer App Component Imports
import { App } from "./App"
import { AddGame } from './AddGame'
import { Collection } from './Collection';

/*************************************
** Base Component
** Routes to App
**************************************/

export class Base extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Route exact path='/'><App/></Route>
        <Route path='/games/add'><AddGame/></Route>
        <Route path='/collections/:id'><Collection/></Route>
      </div>
    )
  }
}