import React, { Component } from 'react'
import Hour from './Hour';

export default class TodayForcast extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      today: this.props.today,
      alerts: this.props.alerts
    }
  }

  render() {
    const { today, alerts } = this.state;
    return (
      <div className="today beautiful-blur p-4 w-100 rounded-4 mb-3">
        <div className="alert-text">{alerts.alert.length > 0 ? alerts.alert[0].event : "No alerts so far."}</div>
        <hr />
        <div className="hours d-flex justify-content-evenly">
          {today.map((hour, index) => <Hour key={index} hour={hour} now={index === 0 ? true : false}/>)}
        </div>
      </div>
    )
  }
}
