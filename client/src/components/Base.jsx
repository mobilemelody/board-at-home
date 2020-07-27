// React Redux Imports
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// RC Dealer App Component Imports
import { App } from "./App";
import { AddGame } from './AddGame';
import { UserProfile } from './UserProfile';

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
        <Route path='/profile/'><UserProfile/></Route>
      </div>
    )
  }
}