import axios from 'axios';

const fetchCountries = async () => {
    try {
      const response = await axios.get('/countries'); // Use the endpoint you configured
      console.log('API Response:', response);
      const data = response.data.data;
      console.log('data:', data);      
      // Create a map to store countries with id as the key
      const countryMap = new Map();  
      // Iterate through the 'data' array and add countries to the map
      data.forEach((country) => {
        countryMap.set(country.id, country.name);
      });  
      //console.log("Country Map:", countryMap);  
      return countryMap;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
const fetchStatesByCountry = async (country) => {
    console.log("******************** inside fetchstatebycounty",country.id);
    console.log("axios url",'/state');
    try {
        const response = await axios.get('/states'); 
        console.log('fetchStatesByCountry API Response:', response);
        const data = response.data.data;
       console.log('data:', data);      
      const stateMap = new Map();      
      data.forEach((state) => {
        if(country.id==state.country_id)
        stateMap.set(state.id, state.name);
      });
        //console.log("state Map:", stateMap);  
      return stateMap;
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
};

const fetchCitiesByState = async (state) => {
    console.log("******************** inside fetchCitiesByState",state.id);
    console.log("axios url",'/state');
    try {
        const response = await axios.get('/cities');
        console.log('fetchCitiesByState API Response:', response);
        const data = response.data.data;
       console.log('data:', data);       
      const citiesMap = new Map();      
      data.forEach((city) => {
        if(state.id==city.state_id)
        citiesMap.set(city.id, city.name);
      });
  
      console.log("Cities Map:", citiesMap);
  
      return citiesMap;
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
};

export { fetchCountries, fetchStatesByCountry, fetchCitiesByState };
