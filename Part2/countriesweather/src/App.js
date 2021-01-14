
import React,{useState,useEffect} from 'react'
import CountriesDetails from './components/CountriesDetails';
import CountriesFilter from './components/CountriesFilter';
import countriesService from './services/contries'

const App = () => {
    const [searchs,setSearchs] = useState('');
    const [countriesDetails,setCountriesDetails] = useState([]);
    useEffect(()=>{
        countriesService.getAllCountries().then(data => {
            setCountriesDetails(data);
          }); 
    },[])
    const filteredCountries = searchs ? countriesDetails.filter(   
             country => country.name.toLowerCase().search(searchs.toLowerCase()) !== -1
             ) : countriesDetails;
    const handleSearch = (event) => {
        setSearchs(event.target.value)
    }
    const changeCountriesFilter = filter => {
        setSearchs(filter);
      };
    return (
        <div>
            <CountriesFilter value={searchs} onChange={handleSearch}/>
            <CountriesDetails countries={filteredCountries} changeFilter={changeCountriesFilter}/>
            
        </div>
    )
}

export default App
