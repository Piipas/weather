import React, { Component } from 'react'

export default class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.current,
      location: this.props.location,
      today: this.props.today,
      dateObject: new Date(),
      hours: null,
      minutes: null,
      seconds: null,
      time: ""
    }
  }

  componentDidMount() {
    this.setState({hours: this.state.dateObject.getHours(), minutes: this.state.dateObject.getMinutes(), seconds: this.state.dateObject.getSeconds()})
    this.updateTime();
    setInterval(_ => this.updateTime(), 1000);
  }

  updateTime = _ => {
    this.setState({dateObject: new Date()});
    this.setState({hours: this.state.dateObject.getHours(), minutes: this.state.dateObject.getMinutes(), seconds: this.state.dateObject.getSeconds()})
  }

  render() {
    const { temp_c, condition } = this.state.current;
    const { name: city, country } = this.state.location;
    const { maxtemp_c, mintemp_c } = this.state.today;
    const { hours, minutes } = this.state;

    return (
      <div className="current text-light d-flex mb-3">
        <div className="temperature-degree fw-semibold lh-1">{parseInt(temp_c)}<sup>°C</sup></div>
        <div className="temperature-icon d-flex align-items-center ps-3"><img src={condition.icon} alt={condition.text} width={80}/></div>
        <div className="location-city w-100 fw-semibold">{city}, {country}</div>
        <div className="extra_information h5 fw-light">{`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`} | H:{parseInt(maxtemp_c)}° L:{parseInt(mintemp_c)}°</div>
      </div>
    )
  }
}
