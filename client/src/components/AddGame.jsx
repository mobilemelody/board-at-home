import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux'

class AddGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      image: null,
      publisher: '',
      categories: null,
      min_players: null,
      max_players: null,
      min_playtime: null,
      max_playtime: null,
      year: null,
      min_age: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  createForm() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" name="name" onChange={this.handleChange} />
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
          <Select isMulti options={this.props.category_list} className="basic-multi-select" classNamePrefix="select" name="categories" onChange={this.handleCategoryChange.bind(this)} />
        </div>
        <h3 className="mt-4">Game Details</h3>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Players</label>
            <div className="d-flex flex-row">
              <input type="number" className="form-control" name="min_players" placeholder="min" onChange={this.handleChange} />
              <div className="mx-2 mt-1"> &ndash; </div>
              <input type="number" className="form-control" name="max_players" placeholder="max" onChange={this.handleChange} />
            </div>
          </div>


          <div className="form-group col-md-6">
            <label>Playtime (minutes)</label>
            <div className="d-flex flex-row">
              <input type="number" className="form-control" name="min_playtime" placeholder="min" onChange={this.handleChange} />
              <div className="mx-2 mt-1"> &ndash; </div>
              <input type="number" className="form-control" name="max_playtime" placeholder="max" onChange={this.handleChange} />
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
            <input type="number" className="form-control" name="min_age" onChange={this.handleChange} />
          </div>
        </div>

        <input type="submit" className="btn btn-lg btn-primary" value="Save Game" />

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

    let values = {...this.state};
    if (values.categories) {
      values.categories = values.categories.map(e => e.value);
    }

    // Upload image file to S3
    if (values.image) {
      let image_data = {
        fileName: values.image.name,
        fileType: values.image.type,
      }
      // TODO: Update URL
      fetch('http://192.168.99.100:3000/games/sign-s3', {
        method: 'POST',
        body: JSON.stringify(image_data),
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(res => res.json())
      .then(res => {
        let returnData = res.data.returnData;
        let signedRequest = returnData.signedRequest;
        let url = returnData.url;
        fetch(signedRequest, {
          method: 'PUT',
          body: values.image,
          headers: {
            "Content-Type": image_data.fileType
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
    // TODO: Update URL
    fetch('http://192.168.99.100:3000/games', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res => res.json())
    .then(res => {
      // TODO: Go to new game page
      console.log(res)
    })
  }

  render() {
    return (
      <div className="container py-3">
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
      category_list: [],
    };
  }

  componentDidMount() {
    // Get categories from database
    // TODO: Update URL
    fetch('http://192.168.99.100:3000/categories')
      .then((res) => res.json())
      .then(res => {
        // Create select options object
        let options = [];
        res.forEach(e => options.push({ value: e.id, label: e.category }));

        this.setState({ category_list: options });
      });
  }

  render() {
    return (
      <AddGameForm category_list={this.state.category_list} />
    );
  }

}

export const AddGame = connect(null, null)(_AddGame)
