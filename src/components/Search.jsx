import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getInputValue = event => {
    this.props.onSearch(event.target.value);
  }

  render() {
    return (
      <div className="input-group w-100 d-flex">
        <input type="text" className="form-control bg-transparent text-light beautiful-blur shadow-none border-light border-end-0" placeholder="Search location..." name="location" autoComplete="off" onChange={this.getInputValue} />
        <span className="input-group-text bg-transparent shadow-none beautiful-blur border-start-0 border-light text-light" id="basic-addon1"><i className="fas fa-magnifying-glass fa-lg fa-flip-horizontal"></i></span>
      </div>
    )
  }
}
