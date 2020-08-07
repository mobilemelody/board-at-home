import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://boardathome.herokuapp.com';

class AddGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      image: null,
      publisher: '',
      categories: null,
      minPlayers: null,
      maxPlayers: null,
      minPlaytime: null,
      maxPlaytime: null,
      year: null,
      minAge: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createForm() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="name">Name<span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="name" required onChange={this.handleChange} />
          </div>
        </div>

        <div className="form-group">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" name="description" onChange={this.handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="image">Image</label>
            <input type="file" className="form-control-file" name="image" onChange={this.handleChange} />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="publisher">Publisher</label>
            <input type="text" className="form-control" name="publisher" onChange={this.handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="categories">Categories</label>
          <Select isMulti options={this.props.categoryList} className="basic-multi-select" classNamePrefix="select" name="categories" onChange={this.handleCategoryChange.bind(this)} />
        </div>
        <h3 className="mt-4">Game Details</h3>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Players</label>
            <div className="d-flex flex-row">
              <input type="number" className="form-control" name="minPlayers" placeholder="min" onChange={this.handleChange} />
              <div className="mx-2 mt-1"> &ndash; </div>
              <input type="number" className="form-control" name="maxPlayers" placeholder="max" onChange={this.handleChange} />
            </div>
          </div>


          <div className="form-group col-md-6">
            <label>Playtime (minutes)</label>
            <div className="d-flex flex-row">
              <input type="number" className="form-control" name="minPlaytime" placeholder="min" onChange={this.handleChange} />
              <div className="mx-2 mt-1"> &ndash; </div>
              <input type="number" className="form-control" name="maxPlaytime" placeholder="max" onChange={this.handleChange} />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="year">Year</label>
            <input type="number" className="form-control" name="year" onChange={this.handleChange} />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="age">Minimum Age</label>
            <input type="number" className="form-control" name="minAge" onChange={this.handleChange} />
          </div>
        </div>

        <Button
          as="input"
          type="submit"
          variant="info"
          value="Save Game"
        />

      </form>
    );
  }

  handleChange(event) {
    const name = event.target.name;
    const value = name === 'image' ? event.target.files[0] : event.target.value;

    this.setState({ [name]: value });

    if (name === 'name') {
      // TODO: Check database for similar game names
    }
  }

  handleCategoryChange(categories) {
    this.setState({ categories: categories });
  }

  handleSubmit(event) {
    event.preventDefault();

    let values = { ...this.state };
    if (values.categories) {
      values.categories = values.categories.map(e => e.value);
    }

    // Upload image file to S3
    if (values.image) {
      let imageData = {
        fileName: values.image.name,
        fileType: values.image.type,
      }

      fetch(`${baseURL}/games/sign-s3`, {
        method: 'POST',
        body: JSON.stringify(imageData),
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(res => res.json())
        .then(res => {
          const { signedRequest, url } = res.data.returnData;
          fetch(signedRequest, {
            method: 'PUT',
            body: values.image,
            headers: {
              "Content-Type": imageData.fileType
            },
          })
            .then(res => {
              // Save values to database
              values.image = url;
              this.saveToDB(values);
            })
        })
    } else {
      this.saveToDB(values);
    }

  }

  saveToDB(values) {
    fetch(`${baseURL}/games`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(res => {
        // Go to new game page
        this.props.handleSubmit(res.id);
      })
  }

  render() {
    return (
      <div className="container py-5">
        <h1>Add a Game</h1>
        {this.createForm()}
      </div>
    );
  }
}


class _AddGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      gameId: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id) {
    this.setState({ gameId: id });
  }

  componentDidMount() {
    // Get categories from database
    fetch(`${baseURL}/categories`)
      .then((res) => res.json())
      .then(res => {
        // Create select options object
        let options = [];
        res.forEach(e => options.push({ value: e.id, label: e.category }));

        this.setState({ categoryList: options });
      });
  }

  render() {

    const { user } = this.props;

    // Show loading spinner if fetching user
    if (user.isFetching && !user.isReceived) {
      return (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" />
        </div>
      );
    }

    // Show login form if not logged in
    if (!user.isLoggedIn) {
      return <Redirect to="/login" />
    }

    if (this.state.gameId) {
      return <Redirect push to={'/game/'+this.state.gameId} />
    }
    return (
      <div>
        {alert}
        <AddGameForm categoryList={this.state.categoryList} handleSubmit={this.handleSubmit} />
      </div>
    );
  }

}

export const AddGame = connect(state => {
  const { user } = state;
  return { user };
}, null)(_AddGame)
