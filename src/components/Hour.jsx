import React, { Component } from 'react'

export default class Hour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: this.props.hour,
      now: this.props.now
    }
  }
  render() {
    const hour = this.state.hour;
    const hourNumber = this.state.now ? "Now" : hour.time.slice(-5, -3);
    return (
      <div className="hour text-center">
        <div className="hour-text">{hourNumber}</div>
        <div className="condition-icon">
          <img src={hour.condition.icon} alt={hour.condition.text} title={hour.condition.text} />
        </div>
        <div className="temperature-degree"><span className="fw-semibold">{parseInt(hour.temp_c)}</span><sup>°C</sup></div>
      </div>
    )
  }
}
