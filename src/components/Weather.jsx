import React, { Component } from 'react'
import Current from './Current';
import TodayForecast from './TodayForecast';
import WeekForecast from './WeekForecast';

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      location: {},
      current: {},
      todayForecast: {},
      weekForecast: {},
      isLoading: true,
      isUpdating: false,
      hoursForecastCount: 5
    }
  }

  componentDidMount() {
    this.getData();
    setInterval(_ => this.getData(), 60000);
  }

  getData = _ => {
    const forecastUrl = "https://api.weatherapi.com/v1/forecast.json?key=b35ea571ca444994a40125752232409&q=salé&days=5&aqi=no&alerts=yes";
    const now = new Date();

    fetch(forecastUrl)
      .then(reponse => reponse.json())
      .then(data => {
        let todayForecastCounter = 0;
        let todayForecast = data.forecast.forecastday[0].hour.filter(hour => {
          const hourDate = new Date(hour.time);
          if (hourDate.getHours() >= now.getHours() && todayForecastCounter <= this.state.hoursForecastCount) {
            todayForecastCounter++;
            return hour;
          }
          return;
        })
        if (todayForecast.length < this.state.hoursForecastCount) {
          let hoursNeededCount = this.state.hoursForecastCount - todayForecast.length
          for(let i=0; i<=hoursNeededCount; i++) {
            todayForecast.push(data.forecast.forecastday[1].hour[i]);
          }
        }
        this.setState({current: data.current, weekForecast: data.forecast.forecastday, location: data.location, isLoading: false, isUpdating: false, todayForecast});
      })
      .catch(err => console.log(err))
  }

  render() {
    const { location, current, todayForecast, weekForecast, isUpdating } = this.state;
    if (this.state.isLoading) {
      return (
        <div className="container weather rounded-5 position-relative z-2 d-flex align-items-center justify-content-center">
          <i className="text-light fw-bold h1">Loading...</i>
        </div>
      )
    }

    return (
      <>
        <div className="blur position-absolute vh-100 vw-100 z-0 top-0 start-0"></div>
        <div className="container weather rounded-5 position-relative z-2 text-light">
          <div className="row h-100">
            <div className="col-6 d-flex align-items-end">
              <Current current={current} location={location} updating={isUpdating} today={weekForecast[0].day} />
            </div>
            <div className="col-6">
              <TodayForecast today={todayForecast} />
              <WeekForecast days={weekForecast} />
            </div>
          </div>
        </div>
      </>
    )
  }
}
