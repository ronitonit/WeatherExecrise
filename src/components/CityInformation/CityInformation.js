import React from 'react';
import '../CityInformation/style.css';

const CityInformation = props => {

    let imgUrl = "http://openweathermap.org/img/w/"+props.weather.icon+".png"
    return (
    <div className="cityInfo">
                <h1>{props.city.name}</h1>
                <small>{props.weather.description}</small>
                <img src = {imgUrl}/>
            </div>
    );
};
export default CityInformation;