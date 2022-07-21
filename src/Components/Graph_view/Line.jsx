import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getFormattedWeatherData from '../../Utiliies/Utility';
import Forecast from '../Forecast/Forecast';
import { SearchBar } from '../Search_bar/SearchBar';
import { GraphData } from './GraphData';


export const Line = ({ query, setQuery }) => {
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [update, setUpdateChange] = useState(true);
  const [searchQuery, setSearchQuery] = useState()
  const [data,setData] = useState([])

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q !== '' ? query.q : 'current location.';
      toast.info('Fetching weather for ' + message);
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        console.log(data)
        setWeather(data);
      });
    };
    fetchWeather();
  }, [units, update]);

  // const handleSearch = (payload)=>{
  //   setSearchQuery(payload)
  // }
  const handleSearch = async (payload) => {
    console.log(payload)
    // const message = searchQuery.q !== '' ? searchQuery.q : 'current location.';
    // toast.info('Fetching weather for ' + message);
    await getFormattedWeatherData({ q:payload, units }).then((data) => {
      toast.success(
        `Successfully fetched weather for ${data.name}, ${data.country}.`
      );
      console.log(data)
      setData(data);
    });
  };
  return (
    <>
      {weather && (
        <div>
          <SearchBar
            setQuery={setQuery}
            units={units}
            setUnits={setUnits}
            update={update}
            setUpdateChange={setUpdateChange}
            handleSearch={handleSearch}
          />
          <GraphData hourlyData={weather.hourly} weather={weather} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}
    </>
  );
};
