import React, { Component } from 'react';
import env from "react-dotenv";
import Current from './Current';
import TodayForecast from './TodayForecast';
import WeekForecast from './WeekForecast';
import Search from './Search';
import Suggestion from './Suggestion';
import cities from 'cities.json';

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
      hoursForecastCount: 5,
      locationCredentials: "rabat",
      filteredCities: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = _ => {
    const apiKey = env.REACT_APP_WEATHER_API_KEY;
    const cookieLocation = document.cookie.split(";").find(c => c.startsWith("__current_location="))?.split("=")[1];
    console.log(cookieLocation)
    const location = cookieLocation ? `${JSON.parse(cookieLocation).lat},${JSON.parse(cookieLocation).lng}` : this.state.locationCredentials;
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no&alerts=yes&lang=en`;
    const now = new Date();
    console.log("called")
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
        this.setState({ current: data.current,
                        weekForecast: data.forecast.forecastday,
                        location: data.location,
                        alerts: data.alerts,
                        isLoading: false,
                        isUpdating: false,
                        todayForecast
        });
      })
      .catch(err => console.log(err))
  }

  selectLocation = async (lat, lng) => {
    const credentials = `${lat},${lng}`;
    document.cookie = `__current_location=${JSON.stringify({ lat, lng })}`;
    this.setState({ locationCredentials: credentials, isLoading: true, filteredCities: [] }, _ => {
      this.getData();
    });
  }

  locationInputChange = query => {
    if (query.length > 0) {
      let filteredCities = cities.filter(city => city.name.toLowerCase().startsWith(query.toLowerCase()));
      filteredCities = filteredCities.sort((cityOne, cityTwo) => (cityOne.name < cityTwo.name) ? 1 : (cityOne.name > cityTwo.name) ? -1 : 0).reverse();
      filteredCities = filteredCities.slice(0, 10);
      this.setState({filteredCities});
    } else {
      this.setState({filteredCities: []});
    }
  }

  render() {
    const { location, current, todayForecast, weekForecast, alerts, isUpdating } = this.state;
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
            <div className="col-6 d-flex align-items-end flex-wrap">
              <div className="search w-100 pe-4 position-relative">
                <Search cities={this.state.filteredCities} onSelect={this.selectLocation} onSearch={this.locationInputChange}/>
                <div className="pe-4 position-absolute w-100">
                  <div className="search-results p-2 beautiful-blur w-100 mt-1 rounded-2 overflow-auto">
                    {this.state.filteredCities.map((city, index) => <Suggestion key={`${city.lat},${city.lng}`} className="search-result bg-danger p-1 d-flex" city={city} onClick={this.selectLocation} />)}
                  </div>
                </div>
              </div>
              <Current current={current} location={location} updating={isUpdating} today={weekForecast[0].day} />
            </div>
            <div className="col-6">
              <TodayForecast today={todayForecast} alerts={alerts} />
              <WeekForecast days={weekForecast} />
            </div>
          </div>
        </div>
      </>
    )
  }
}