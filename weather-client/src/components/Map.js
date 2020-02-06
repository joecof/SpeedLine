import React, { Component } from 'react'
import {GoogleApiWrapper, Map, Marker, Circle, InfoWindow, Polygon} from 'google-maps-react';
import snow from '../images/snow.png'
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

    this.circle = React.createRef()

    this.mapClicked = this.mapClicked.bind(this);
    this.markerClick = this.markerClick.bind(this);
    this.menuClick = this.menuClick.bind(this);

    // this.generateCoordinates = this.generateCoordinates.bind(this);
    // this.genRand = this.genRand.bind(this);
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

  // genRand(min, max, decimalPlaces) {  
  //   var rand = Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);  
  //   var power = Math.pow(10, decimalPlaces);
  //   return Math.floor(rand*power) / power;
  // }

  // generateCoordinates(lat1 , lat2, lng1, lng2) {

  //   const lat = this.genRand(lat2, lat1, 5)
  //   const lng = this.genRand(lng2, lng1, 5)

  //   this.setState({
  //     lat: lat,
  //     lng: lng
  //   })
    
  // }

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
      zoom: 9
    })

  }

  markerClick(props, marker, e) {
    console.log("marker click")
    console.log(marker.position.lat());

    this.setState({
      center: {
        lat: marker.position.lat(),
        lng: marker.position.lng()
      },
      zoom: 11
    })
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
            lat: 49.2500,
            lng: -123.0000
          }}
        center = {{
          lat: this.state.center.lat,
          lng: this.state.center.lng
        }}
        zoom = {this.state.zoom}
        onClick={this.mapClicked}>
        {
          this.state.data.weatherData != null &&
          this.state.data.weatherData.map( (marker, i) => (
          <Marker
            key = {i}
            onClick={this.markerClick}
            name={'Current location'} 
            title={'The marker`s title will appear as a tooltip.'}
            icon={{
              url: snow,
              scaledSize: new this.props.google.maps.Size(20,20)
            }}
            position={{lat: marker.coordinates.lat, lng: marker.coordinates.lng}} 
          />
        ))} 

        <InfoWindow
        
          visible={true}>
            <div>
              <h1>hi</h1>
            </div>
        </InfoWindow>
    </Map>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyD23xqn0jkx4uzRBASktvUdKBl37vgDH50')
})(MapContainer)