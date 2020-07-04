import React from 'react';

class AddGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      image: null,
      publisher: '',
      categories: [''],
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
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name" onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" name="description" onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" className="form-control-file" name="image" onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="publisher">Publisher</label>
          <input type="text" className="form-control" name="publisher" onChange={this.handleChange} />
        </div>
        
        <div className="form-group">
          <label>Categories</label>
          <input type="button" className="btn btn-secondary" value="add" onClick={this.addCategory.bind(this)} />
        </div>
        <div className="form-group">
          {this.createCategoryInputs()}
        </div>

        <h3>Game Details</h3>

        <div className="form-group">
          <label>Players</label>
          <input type="number" className="form-control" name="min_players" onChange={this.handleChange} />
          -
          <input type="number" className="form-control" name="max_players" onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label>Playtime (minutes)</label>
          <input type="number" className="form-control" name="min_playtime" onChange={this.handleChange} />
          -
          <input type="number" className="form-control" name="max_playtime" onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input type="number" className="form-control" name="year" onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="age">Minumum Age</label>
          <input type="number" className="form-control" name="min_age" onChange={this.handleChange} />
        </div>

        <input type="submit" className="btn btn-primary" value="Save Game" />

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

  createCategoryInputs() {
    return this.state.categories.map((e, i) =>
      <div key={i}>
        <input type="text" className="form-control" value={e||''} onChange={this.handleCategoryChange.bind(this, i)} />
        <input type="button" className="btn btn-secondary" value="Remove" onClick={this.removeCategory.bind(this, i)} />
      </div>
    );
  }

  handleCategoryChange(i, event) {
    let categories = [...this.state.categories];
    categories[i] = event.target.value;
    this.setState({ categories });
  }

  addCategory() {
    this.setState(prevState => ({ categories: [...prevState.categories, ''] }));
  }

  removeCategory(i) {
    let categories = [...this.state.categories];
    categories.splice(i, 1);
    this.setState({ categories });
  }

  handleSubmit(event) {
    event.preventDefault();

    let values = this.state;
    values.categories = values.categories.filter(e => e !== '');

    console.log(values);

    // TODO: Upload image file to S3
    // TODO: Save values to database
  }

  render() {
    return (
      <div className="container">
        <h1>Add a Game</h1>
        {this.createForm()}
      </div>
    );
  }
}

export default AddGame;
