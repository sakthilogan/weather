import React from 'react';
import './App.css';
import axios from 'axios';

import { ColorRing } from  'react-loader-spinner'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      country: "",
      temp:"",
      loader:false,

      type:'',
      humidity:'',
      pressure:''
    };
  }

  onSearch = () =>{
    this.setState({loader: true})
    let url =
    "http://api.openweathermap.org/data/2.5/weather?appid=3c300c8a571734d10bee3d12daafd184&units=metric&q=" +
    this.state.country;

    axios.get(url).then((response)=>{console.log("Response is working", response);
    this.setState({temp: response.data.main.temp, loader:false,
      type:response.data.weather[0].description,
      humidity:response.data.main.humidity,
      pressure:response.data.main.pressure});
  });
  };

  render() {
    console.log("this.state", this.state);
    return <div className='col-12 col-md-4 offset-md-4'> 
    <h2 className='text-center'>TODAY WEATHER FORECAST - REPORT</h2>
    <div className="centerDiv container"> 
      
       <input 
       type="text" 
       name="country" 
       placeholder='Enter Country...'
       className='inputDiv'
      onChange={(e)=>this.setState({country:e.target.value})}
       />

      <button className='buttonDiv' onClick={() => this.onSearch()}>Search</button>
        {this.state.loader ? (
          ""
        ):(
          <div>
      Current Temperature = <div className='temp'>{this.state.temp}°Celsius</div>
      Country = {this.state.country} <br/>
      Type = {this.state.type} <br/>
      Humidity = {this.state.humidity} g.m-3<br/>
      Pressure = {this.state.pressure} N/m2<br/>
      
      </div>
        )}

                <ColorRing
            visible={this.state.loader}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
       </div>
       </div>
  }
}


export default App;
