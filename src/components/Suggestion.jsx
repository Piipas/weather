import React, { Component } from 'react';
import Countries from 'countries-api';

export default class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestiedCity: this.props.city
    }
  }

  selectCity = _ => {
    const { lat, lng } = this.state.suggestiedCity;
    this.props.onClick(lat, lng);
  }

  render() {
    const { name, country: countryCode } = this.state.suggestiedCity;
    const country = Countries.findByCountryCode(countryCode).data[0].name.common;
    return (
      <div className="search-result p-2 d-flex border-bottom border-light border-opacity-25" onClick={this.selectCity}>{`${name}, ${country}`}</div>
    )
  }
}
