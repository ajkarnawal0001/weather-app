import React, { useState } from 'react'
import { UilSearchAlt , UilMapMarkerInfo} from '@iconscout/react-unicons'
import { toast } from "react-toastify";
export const SearchBar = ({ setQuery, units, handleSearch, setUpdateChange,update }) => {
  const [city, setCity] = useState("");

  let [timer, setTimer] = useState(undefined);

  // debouncing for search bar using callback handleSearch function
  const handleChange = (e) => {
    const { value } = e.target;
    setCity(value)
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        handleSearch(value);
      }, 500)
    );
  };
  
  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
      console.log(city)
      setUpdateChange(!update)
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
        setUpdateChange(!update)
      });
    }
  };
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input type="text" className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-lg"
        placeholder='sreach for city...'
        // value={city}
        onChange={handleChange}
        />
        <UilSearchAlt size={25} className='text-black cursor-pointer transition ease-out hover:scale-125'
        onClick={handleSearchClick}
        />
        <UilMapMarkerInfo className='text-black cursor-pointer transition ease-out hover:scale-125'
         onClick={handleLocationClick}/>
      </div>
    </div>
  )
}
