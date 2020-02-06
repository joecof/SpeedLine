import React, { Component } from 'react'
import {GoogleApiWrapper, Map, Marker, Circle, InfoWindow, Polygon} from 'google-maps-react';
import snow from '../images/snow.png'
import cloud from '../images/cloud.png'
import sun from '../images/sun.png'
import agent from '../api/agent';
import Drawer from '@material-ui/core/Drawer';
import './style.css'


export class MapContainer extends Component {

  constructor(props) {
    super(props); 

    this.state = ({
      data: [],
      center: {
        lat: 49.2500,
        lng: -123.0000
      },
      zoom: 5
    })

    this.mapClicked = this.mapClicked.bind(this);
    this.markerClick = this.markerClick.bind(this);
    this.menuClick = this.menuClick.bind(this);
    this.generateWeatherImage = this.generateWeatherImage.bind(this);


  }

  componentDidMount() {
    agent.weatherForecast.getWeatherData()
      .then(response  => {
        this.setState({ data: response })
      })
      .catch(err => {
        console.log(err);
      })
  }

  mapClicked(mapProps, map, clickEvent) {
    console.log("map click")
  }

  menuClick(city, e) {
    console.log("city click")
    this.setState({
      center: {
        lat: city.coordinates.lat,
        lng: city.coordinates.lng,
      },
      zoom: 10
    })
  }

  markerClick(props, marker, e) {
    this.setState({
      center: {
        lat: marker.position.lat(),
        lng: marker.position.lng()
      },
      zoom: 11
    })
  }

  generateWeatherImage(currentCondition) {

    const condition = currentCondition.toString(); 
    if(condition.includes("Snow")) {
      return snow;
    } else if (condition.includes("Cloudy")){
      return cloud;
    } else if (condition.includes("Clear")){
      return sun;
    } else {
      return snow;
    }

  }
  
  render() {

    return(
      <div>
      <Drawer open={true} variant="permanent" className = "Drawer">
        <h1> Weather System </h1>
         {
          this.state.data.weatherData != null &&
          this.state.data.weatherData.map( (item, i) => (
          <button key={i} onClick={() => this.menuClick(item)} className = "button">{item.city}</button>
        ))} 
      </Drawer>
      <Map 
        style={{width: '80%', height: '100%', position: 'relative', float: 'right'}}
        google={this.props.google} 
        zoom={9}
        initialCenter={{
          lat: 58.4374, 
          lng: -129.9994
          }}
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
            name={'Current location'} 
            title={'The marker`s title will appear as a tooltip.'}
            icon={{
              url: this.generateWeatherImage(this.state.data.weatherData[i].currentConditions),
              scaledSize: new this.props.google.maps.Size(30,30)
            }}
            position={{lat: marker.coordinates.lat, lng: marker.coordinates.lng}} 
          />
        ))} 
    </Map>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyD23xqn0jkx4uzRBASktvUdKBl37vgDH50')
})(MapContainer)