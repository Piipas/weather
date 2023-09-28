import React, { Component } from 'react'
import tempStatus from '../json/config.json';

export default class HighLow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hourTemp: this.props.hourTemp,
      dayMinTemp: this.props.minTemp,
      dayMaxTemp: this.props.maxTemp,
      time: new Date(this.props.time),
      title: null,
      status: null,
      isLoading: true
    }
  }

  componentDidMount() {
    const { time, hourTemp } = this.state;
    const timeHour = String(this.state.time.getHours()).padStart(2, '0');
    const timeMinutes = String(this.state.time.getMinutes()).padStart(2, '0');
    const numTime = `${timeHour}:${timeMinutes}`;
    const title = `${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")} - ${this.state.hourTemp}°C`;
    let status;
    // const status = this.state.hourTemp > (this.state.dayMaxTemp - ((this.state.dayMaxTemp - this.state.dayMinTemp) / 2)) ? "high" : "low";
    if (hourTemp > 40) {
      status = "very hot";
    } else if (hourTemp > 30) {
      status = "hot";
    } else if (hourTemp > 20) {
      status = "normal";
    } else if (hourTemp > 10) {
      status = "cold";
    } else if (hourTemp > 0) {
      status = "very cold";
    } else if (hourTemp <= 0) {
      status = "very cold sake";
    }
    this.setState({time: numTime, title, status, isLoading: false});
  }

  render() {
    if (!this.state.isLoading) {
      const { time, title, status } = this.state;
      return <div key={time} title={title} className={`day-night-status h-100`} style={{backgroundColor: tempStatus.temperature.status[status].color}}></div>
    }
  }
}
