import React, { Component } from 'react'
import { GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react';
import snow from '../images/snow.png'
import cloud from '../images/cloud.png'
import fog from '../images/fog.png'
import sun from '../images/sun.png'
import rain from '../images/rain.png'
import logo from '../images/logo.png'
import defaultCondition from '../images/default.png'
import constants from '../constants/constants';
import agent from '../api/agent';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import './style.css'

export class MapContainer extends Component {

  constructor(props) {
    super(props); 

    this.state = ({
      data: [],
      center: {
        lat: constants.DEFAULT_CENTER.lat, 
        lng: constants.DEFAULT_CENTER.lng
      },
      zoom: constants.DEFAULT_ZOOM,
      showingInfoWindow: false,
      activeMarker: {},
      currentCity: {}
    })

    this.mapClicked = this.mapClicked.bind(this);
    this.markerClick = this.markerClick.bind(this);
    this.menuClick = this.menuClick.bind(this);
    this.generateWeatherImage = this.generateWeatherImage.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData()
    this.weatherUpdater = setInterval(this.loadData, 600000);
  }

  componentWillUnmount() {
    clearInterval(this.weatherUpdater);
  }

  async loadData() {
    try {
      const response = await agent.weatherForecast.getWeatherData();

      if(!response) {
        throw new Error('No weather data found.');
      }

      this.setState({
        data: response
      })
   } catch (e) {
       console.log(e);
   }
 }

  menuClick(city, e) {
    this.setState({
      center: {
        lat: city.coordinates.lat,
        lng: city.coordinates.lng,
      },
      zoom: 9
    })
  }

  mapClicked() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  markerClick(props, marker, e) {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      currentCity: props.data
    })
  }

  generateWeatherImage(currentCondition) {
    const condition = currentCondition.toString().toLowerCase(); 

    if(condition.includes("snow")) {
      return snow;
    } else if (condition.includes("cloudy")){
      return cloud;
    } else if (condition.includes("clear")){
      return sun;
    } else if (condition.includes("rain")){
      return rain;
    } else if (condition.includes("mist")){
      return fog;
    } else if (condition.includes("fog")){
      return fog;
    } else if (condition.includes("sunny")){
      return sun;
    } else {
      return defaultCondition;
    }
  }
  
  render() {
    return(
      <>
        <Drawer open={true} variant="permanent" className = "Drawer">
          <img src={logo} style = {{width: '30%', margin: '0 auto'}} alt = "speedline logo"></img>
          <h1> Weather System </h1>
          <Button onClick={() => {this.setState({center: { lat: 53.9171, lng: -122.7497}, zoom: 5})}} color="secondary" className = "button">All Cities</Button>
          {
            this.state.data.weatherData != null &&
            this.state.data.weatherData.map( (item, i) => (
            <Button key={i} onClick={() => this.menuClick(item)} color="primary" className = "button" >{item.city}</Button>
          ))} 
        </Drawer>
        <Map 
          style={{width: '80%', height: '100%', position: 'relative', float: 'right'}}
          google={this.props.google} 
          center = {{
            lat: this.state.center.lat,
            lng: this.state.center.lng
          }}
          zoom = {this.state.zoom}
          onClick={this.mapClicked}>
          {
            this.state.data.weatherData != null &&
            this.state.data.weatherData.map((marker, i) => (
            <Marker
              key = {i}
              onClick={this.markerClick}
              data = {marker}
              name={'Current location'} 
              icon={{
                url: this.generateWeatherImage(this.state.data.weatherData[i].currentConditions),
                scaledSize: new this.props.google.maps.Size(40,40)
              }}
              position={{lat: marker.coordinates.lat, lng: marker.coordinates.lng}} 
            >
            </Marker>
          ))} 

          {
            this.state.data.weatherData != null &&
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div>
                  <p>{this.state.currentCity.city}</p>
                  <p>{this.state.currentCity.currentConditions}</p>
                </div>
            </InfoWindow>
          }
         
      </Map>
    </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyD23xqn0jkx4uzRBASktvUdKBl37vgDH50'),
})(MapContainer)