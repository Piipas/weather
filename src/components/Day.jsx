import React, { Component } from 'react'
import HighLow from './HighLow';

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: this.props.day,
      isToday: this.props.today,
      dayCondition: [],
      dayMinTemp: "",
      dayMaxTemp: "",
      dayHours: [],
      dayName: ""
    }
  }

  componentDidMount() {
    const { date, day, hour } = this.state.day,
          dayDate = new Date(date).toString(),
          dayCondition = day.condition,
          dayMinTemp = day.mintemp_c,
          dayMaxTemp = day.maxtemp_c,
          dayHours = hour,
          dayName = dayDate.slice(0, 3);
    this.setState({dayCondition, dayMinTemp, dayMaxTemp, dayHours, dayName});
  }

  render() {
    const { dayCondition, dayMinTemp, dayMaxTemp, dayHours, dayName, isToday } = this.state;
    return (
      <div className="week-day d-flex align-items-center justify-content-between">
        <div className="day-name fw-semibold">{isToday ? "Today" : dayName}</div>
        <div className="condition-icon mx-3">
          <img src={dayCondition.icon} alt={dayCondition.text} />
        </div>
        <div className="temperature-degree pe-4"><span className="fw-semibold">{parseInt(dayMinTemp)}</span><sup>°C</sup></div>
        <div className="day-night mx-2 d-flex rounded-4 overflow-hidden opacity-75">
          {dayHours.map((hour, index) => <HighLow hourTemp={hour.temp_c} maxTemp={dayMaxTemp} minTemp={dayMinTemp} time={hour.time} key={index} /> )}
        </div>
        <div className="temperature-degree ps-4"><span className="fw-semibold">{parseInt(dayMaxTemp)}</span><sup>°C</sup></div>
      </div>
    )
  }
}
