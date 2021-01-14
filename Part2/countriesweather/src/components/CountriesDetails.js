import React from 'react'
import CountriesWeather from './CountriesWeather';

const CountriesDetails = (props) => {
   const {changeFilter,countries} = props;
   
   switch(true){
       case countries.length > 10 : {
           return <p>Too many matches,type in some more</p>
       }
       case countries.length > 1 && countries.length < 10 : {
           return(
               <div>
                   {countries.map((country) => {
                       return <div key ={country.name}>
                           <p >{country.name}</p>
                           <button onClick={() =>{changeFilter(country.name)}}>Show</button>
                       </div>
                   })}
               </div>
           )
       }
       case countries.length === 1 : {
           return(
               <div>
                   <h1>{countries[0].name}</h1>
                   <p>capital {countries[0].capital}</p>
                    <p>population {countries[0].population}</p>
                    <h3>languages</h3>
                    <ul>
                        {countries[0].languages.map((lang) => {
                            return <li key={lang.name}>{lang.name}</li>
                        })}
                    </ul>
                    <img src={countries[0].flag} width='150px' alt='flag'/>
                    <CountriesWeather value={countries[0].capital}/>
               </div>
           )
       }
       default:
           return null;
   }
}

export default CountriesDetails
