import { Component } from "react";
import { BiNavigation, BiSun,BiCloudRain,BiCloudSnow } from 'react-icons/bi'
import { WiBarometer,WiMoonAltWaxingGibbous6 } from 'react-icons/wi'
import { BsCloud } from 'react-icons/bs'







import withRouter from "../WithRouterComponent/withRouter"

import "./index.css"
import MapsDisplay from "../MapsDisplay";


class DetailsDisplay extends Component {

    state = {
        detailsData : {},dewPoint:null
    }

   componentDidMount() {
    this.fetchData()
   }


   fetchData = async ()=> {
    const {params} = this.props
    const {cityname} = params 
    console.log(cityname)
    const key = "999c6df1e78357ccc60af2e0141d6853"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}`
    const response = await fetch (url)
    const data = await response.json()
    console.log(data)

    const updatedData = {
        country:data.sys.country,
        visibility:data.visibility,
        cityName: data.name, 
        temperature: data.main.temp,
        feelsLike :data.main.feels_like,
        pressure:data.main.pressure,
        clouds:data.weather[0].description,
        windSpeed:data.wind.speed,
        humidity:data.main.humidity ,
        cordinates:data.coord,   
        timezone:data.timezone,
        degreee: data.wind.deg,
        temperatureMax:data.main.temp_max, 
        temperatureMin:data.main.temp_min,
        unixTimeStamp: data.dt,
        sunrise:data.sys.sunrise,
        sunset: data.sys.sunset



    }
    this.setState({detailsData:updatedData}, this.calculateDewPoint)
   
   }

 calculateDewPoint = ()=> {
    const {temperature,humidity} = this.state.detailsData 
    const temperatureCelcuis = (temperature - 273.15).toFixed(0)
    console.log(`temperature ${temperature}`)
    const dewPointCalculated = temperatureCelcuis - ((100-humidity)/5)
    this.setState({dewPoint:dewPointCalculated}) 

 }



   conversion = (temp)=> {
    const updated = (temp-273.15).toFixed(0)
    return updated
   
   }

   timeConvert = (time)=> {
    const totalMinutes = time /60 ; 
    const totalHours = totalMinutes/60 
    console.log(`Hours:${totalHours}`)

   }

   getWindDirection = ()=> {
    const {detailsData} = this.state 
     const {degree} = detailsData 
     switch (true) {
        case (degree >=0 && degree<=22.5): 
            return "North";
            case (degree >= 22.5 && degree < 67.5):
                return   "Northeast";
            case (degree >= 67.5 && degree < 112.5):
                return "East";
            case (degree >= 112.5 && degree < 157.5):
                return "Southeast";
            case (degree >= 157.5 && degree < 202.5):
                return "South";
            case (degree >= 202.5 && degree < 247.5):
                return "Southwest";
            case (degree >= 247.5 && degree < 292.5):
                return "West";
            case (degree >= 292.5 && degree < 337.5):
                return "Northwest";
            default :
            return "North"
     }

   }

   getLocalTime = ()=> {
    const {detailsData} = this.state 
    const {timezone,unixTimeStamp} = detailsData 
    const milliScondsUnixTime = unixTimeStamp * 1000
    console.log(milliScondsUnixTime)
    const localTimemiliSeconds = milliScondsUnixTime + (timezone * 1000)
    console.log(localTimemiliSeconds)
    const newLocalTime = new Date(localTimemiliSeconds)
    
    const date = newLocalTime.getUTCDate()
    const monthNameShort = newLocalTime.toLocaleString('en-us', { month: 'short' })

    let hours = newLocalTime.getUTCHours()
    const minutes = newLocalTime.getUTCMinutes().toString().padStart(2,"0");
    
    const isDayTime =  hours >=6 && hours <=18 
    

    const ampmCheck = hours>=12 ?"PM" : "AM"
    hours = hours % 12 
    const timereturn = `${date} ${monthNameShort}, ${hours}:${minutes} ${ampmCheck}`
    
    return   {timereturn,isDayTime}
    
    
    
   }

   getSunRise = (time)=> {
   
    const sunriseMilli = time * 1000 
    const timing = new Date(sunriseMilli)
    let hours = timing.getUTCHours()
    const minutes = timing.getUTCMinutes().toString().padStart(2,"0");
    const ampmCheck = hours>=12 ? "PM" : "AM" 
    return `${hours}: ${minutes} ${ampmCheck}`
   }

   getSymbolOfClimate = ()=> {
    const {clouds} = this.state.detailsData 
    const {isDayTime} = this.getLocalTime()
    console.log(isDayTime)
    
    if (clouds && typeof (clouds)=== "string") {

    
    
        if (clouds.includes("clear") && (isDayTime))  {
            return <BiSun color="#f09245" />;
        } 
        else if (!isDayTime) {
            return <WiMoonAltWaxingGibbous6 />
        }
        else if (clouds.includes("scattered")) {
            return <BsCloud color="#b8b7b7" />;
        } else if (clouds.includes("rain")) {
            return <BiCloudRain />;
        } else if (clouds.includes("snow")) {
            return <BiCloudSnow />;
        
        } 
        else {
            return <BsCloud />;
        }
    }
}



    render(){
        const {detailsData,dewPoint} = this.state
        console.log(detailsData)
       const {country,cityName,temperature,feelsLike,clouds,windSpeed,humidity,visibility,pressure,cordinates,temperatureMax,temperatureMin,sunrise,sunset} = detailsData
    console.log(detailsData)
    console.log(visibility)
     const windDirection = this.getWindDirection()
     const timeCalculate = this.getLocalTime()
    
     const symbolOfClimate = this.getSymbolOfClimate()
     const { timereturn} = timeCalculate
     
    
    
 
        
        
        return (
            <div className="main-container-weather-page"> 
            <div className="left-sontainer-display"> 
                <p className="time-dispaly">{timereturn}</p>
                <h2>{cityName}, {country}</h2>
                <div className="sun-header">
                    <p className="symbol-size">{symbolOfClimate}</p>
                    <h3 className="main-temperaure">{this.conversion(temperature)} &deg;C</h3> 
                </div>
                    <p className="feels-like-design">Feels Like {this.conversion(feelsLike)} &deg;C. {clouds} </p>
                
                <div className="details-about-climate-container">
                    <div className="left-details" >

                        <p className="wind-speed">  <BiNavigation/> {windSpeed} m/s  {windDirection}</p>
                        <p>Humidity: {humidity}%</p>
                        <p>Dew Point: {dewPoint}&deg;C </p>
                        
                    </div>
                    <div className="bar-visibility-container">
                        <div className="bar-container">
                            <WiBarometer size = {20}/>
                            <p>{pressure}hPa</p>
                        </div>
                        <p>Visibility: {(visibility/1000)}Km</p>
                    </div>
                    </div>
                    <div className="sun-timing-rise">
                        <p>Sunrise : </p> 
                        <p>{this.getSunRise(sunrise)}</p>
                    </div>
                    <div className="sun-set-timing">
                        <p>Sunset:</p>
                        <p>{this.getSunRise(sunset)}</p>
                    </div>
                    <div className="max-min-temperature-container">  
                        <p>Today's Forecast</p>
                       
                        <p>{this.conversion(temperatureMax)} / {this.conversion(temperatureMin)} &deg;C </p>
                    </div>

                  
                
            </div>
            {cordinates && <MapsDisplay details = {cordinates} /> }


            </div>
        )
    }
}


export default withRouter(DetailsDisplay)