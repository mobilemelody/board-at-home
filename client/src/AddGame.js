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
          <label>Categories</label>
          {this.createCategoryInputs()}
        </div>
        <button className="btn btn-light" value="add" onClick={this.addCategory.bind(this)}>
          <i className="fa fa-plus" aria-hidden="true"></i> Add Category
        </button>

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

  createCategoryInputs() {
    // TODO: Convert to select dropdowns and/or add autocomplete
    return this.state.categories.map((e, i) =>
      <div key={i} className="input-group mb-2">
        <input type="text" className="form-control" value={e||''} onChange={this.handleCategoryChange.bind(this, i)} />
        <div className="input-group-append">
          <button className="btn btn-secondary" onClick={this.removeCategory.bind(this, i)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
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

    let values = {...this.state};
    values.categories = values.categories.filter(e => e !== '');

    console.log(values);

    // TODO: Upload image file to S3
    // TODO: Save values to database
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

export default AddGame;
