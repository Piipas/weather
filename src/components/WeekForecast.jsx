import React, { Component } from 'react'
import Day from './Day';

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
        {days.map((day, index) => <Day day={day} key={index} />)}
      </div>
    )
  }
}
