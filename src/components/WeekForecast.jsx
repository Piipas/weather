import React, { Component } from 'react'

export default class WeekForcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: this.props.days
    }
  }

  render() {
    const days = this.state.days;
    return (
      <div className="beautiful-blur w-100 p-4 rounded-4">
        <div>5-Day Forecast</div>
        <hr />
        {days.map((day, index) => {
          const dayDate = new Date(day.date);
          const dayName = index === 0 ? "Today" : dayDate.toString().slice(0, 3)
          return (
            <div className="week-day d-flex align-items-center justify-content-between" key={index}>
              <div className="day-name fw-semibold">{dayName}</div>
              <div className="condition-icon mx-3">
                <img src={day.day.condition.icon} alt={day.day.condition.text} />
              </div>
              <div className="temperature-degree pe-4"><span className="fw-semibold">{parseInt(day.day.mintemp_c)}</span><sup>°C</sup></div>
              <div className="day-night mx-2 d-flex rounded-4 overflow-hidden bg-primary bg-gradient">
                {day.hour.map((hour, index) => hour.temp_c > (day.day.maxtemp_c - ((day.day.maxtemp_c - day.day.mintemp_c) / 2)) ? <div key={index} title="High" className="day-night-status h-100 opacity-75"></div> : <div key={index} title="Low" className="day-night-status night h-100 bg-light opacity-75"></div> )}
              </div>
              <div className="temperature-degree ps-4"><span className="fw-semibold">{parseInt(day.day.maxtemp_c)}</span><sup>°C</sup></div>
            </div>
          )
        })}
      </div>
    )
  }
}
