import Bulk from "./../../db.json";
import React, { useState } from 'react'
import { UilSearchAlt , UilMapMarkerInfo} from '@iconscout/react-unicons'
import "./searchBar.css"
export const SearchBar = ({ setQuery,query,weather, setUpdateChange,update }) => {
const[display,setDisplay]=useState([]);
const [inputStyle, setInputStyle] = useState(false);
const [displayMode, setDisplayMode] = useState(true);
  const handleSearchClick = () => {
    if (!query) setQuery({ q: query })
    setDisplayMode(false)
  }
  
  const inPutBox = () => {
    setInputStyle((current) => !current);
    
      !query ? filterBulkData("") : filterBulkData(query);
    
    setDisplayMode(true);
  };
  const filterBulkData = (text) => {
    let matches = Bulk.filter((x) => {
      const regex = new RegExp(`${text}`, "gi");
      return x.city.match(regex) || x.state.match(regex);
    });
    setDisplay(matches);
  };
  const handleChange = (e) => {
    filterBulkData(e.target.value);
    setQuery({q:e.target.value});
    setDisplayMode(true);
  };
  const setSearch = (city) => {
    const edit = Bulk.filter((item) => {
      return item.city === city;
    });
    setQuery({q:edit[0].city});
    setDisplayMode((current) => !current);
    setUpdateChange(!update)
  };
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({
          lat, lon
        })
      })
      setUpdateChange(!update)
    }
  }
  return (
    <>
 <form onSubmit={(e)=>e.preventDefault()}>
      <div className="container" >
       
        <div>
          <UilMapMarkerInfo
            onClick={handleLocationClick}
            size={25}
          />
        </div>
        <div className="inputdiv">
          <input
            onClick={inPutBox}
            type="text"
            value={query.q}
            onChange={handleChange}
            placeholder="search your city"
            className="input"

          />
        </div>
        <div>
          <UilSearchAlt
             onClick={handleSearchClick}
            size={25}
            className="search"
          />

        </div>
        </div>
        </form>

      <div className="bulk-data-container">
        {displayMode &&
          display.map((e, i) => (
            <div
              key={i}
              className="bulk-data"
              onClick={() => setSearch(e.city)}
            >
              <div className="bulk-data-info">
                <strong>{e.city},</strong>
                <p>{e.state}</p>
              </div>
              <div className="bulk-data-icon">
                
              </div>
            </div>
          ))}
      </div>
      

    </>
  )
}



