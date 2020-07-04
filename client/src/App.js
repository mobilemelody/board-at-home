import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import AddGame from './AddGame';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
  }

  componentDidMount() {
    this.callApi();
  }

  callApi = () => {
    fetch('http://localhost:3000/users')
    .then((res) => res.json())
    .then((res) => this.setState({ apiResponse: res.message}));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>

            <Route path="/games/add">
              <AddGame />
            </Route>

            <Route path="/">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload. {this.state.apiResponse}
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </Route>

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
