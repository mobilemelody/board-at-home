import React from 'react';

const AddGameForm = () => {
  return (
    <form className="form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea className="form-control" id="description" />
      </div>
      
    </form>
  );
}

class AddGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="container">
        <AddGameForm />
      </div>
    );
  }
}

export default AddGame;
