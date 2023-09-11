import React, { useState, useEffect } from 'react';
import { fetchCountries, fetchStatesByCountry, fetchCitiesByState } from './ApiFetcher';

const Display = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  useEffect(() => {
    const fetchData = async () => {
        console.log("fetchdata");
      try {
        const countriesData = await fetchCountries();
        console.log("countriesData",countriesData)
        setCountries(countriesData);  
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
  
    fetchData();
  }, []);  
useEffect(() => {
    const fetchStates = async () => {
      try {
        if (selectedCountry) {
          const statesData = await fetchStatesByCountry(selectedCountry);        
          setStates(statesData);
          console.log("after setting the states value:", states);
        } else {
          
          setStates([]);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
  
    fetchStates();
  }, [selectedCountry]);
  
  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (selectedState) {
          const citiesData = await fetchCitiesByState(selectedState);
          setCities(citiesData);
          console.log("after setting the cities value:", cities);
        } else {         
          setCities([]);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
  
    fetchCities();
  }, [selectedState]);
  const handleCountryChange = (event) => {
   // console.log("event.target.value",event.target.value);
    const selectedCountryId = event.target.value;
    //console.log("selectedCountryId",selectedCountryId);
    const selectedCountryName = event.target.options[event.target.selectedIndex].text;
   // console.log("selected countryname=",selectedCountryName)
    setSelectedCountry({ id: selectedCountryId, name: selectedCountryName });
    //console.log("selectedcountry",selectedCountry)
  };
  const handleStateChange = (event) => {
    //console.log("event.target.value",event.target.value);
    const selectedSatateId = event.target.value;
    //console.log("selectedSatateId",selectedSatateId);
    const selectedStateName = event.target.options[event.target.selectedIndex].text;
    //console.log("selectedStateName =",selectedStateName)
    setSelectedState({ id: selectedSatateId, name: selectedStateName });
    //console.log("selectedState",selectedState)
  };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
 return (
<div className="bg-black min-h-screen flex justify-center items-center">
  <div className="bg-gray-800 p-8 rounded-md shadow-lg text-white">   
      <div className="text-center mb-4">
        <h1 className="text-gray-300 text-2xl font-bold">Place Picker</h1>
      </div>
    <div className="flex space-x-4 mb-4">
      <div className="w-1/3 ">
        <p className="block text-gray-300">
          Country:
        </p>
        <select
          id="country"
          className="form-select bg-gray-700 text-gray-300 rounded-md pr-8"
          value={selectedCountry.id}
          onChange={handleCountryChange}
        >
          <option value="">Select a Country</option>
          {Array.from(countries).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>      
      </div>      
      <div className="whitespace-normal text-center">
        <label htmlFor="state" className="block text-gray-300">
          State:
        </label>
        <select
          id="state"
          className="form-select bg-gray-700 text-gray-300 rounded-md pr-8  truncate cursor-pointer w-40"
          value={selectedState.id}
          onChange={handleStateChange}
        >
          <option value="">Select a State</option>
          {Array.from(states).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>        
      </div>
      <div className="w-1/3 relative">
        <label htmlFor="city" className="block text-gray-300">
          City:
        </label>
        <select
    id="city"
    className="form-select bg-gray-700 text-gray-300 rounded-md pr-8  truncate cursor-pointer w-40"
    value={selectedCity}
    onChange={handleCityChange}
  >
    <option value="">Select a City</option>
    {console.log("inside city block",cities)}
    {cities.size ===0 ? (      
      <option >
        Nothing found        
      </option>
    ) : (
      Array.from(cities).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))
    )}
  </select>        
      </div>
    </div>
  </div>
</div>
  );
};

export default Display; 
