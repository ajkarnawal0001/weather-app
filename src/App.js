import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Line } from "./Components/Graph_view/Line.jsx";

function App() {
  const [query, setQuery] = useState();

  
  useEffect(() => {
    const handleLocation = () => {
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
          return (lat,lon)
        });
      }
    };

    handleLocation();

  }, [])
  return (
    <div
    className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 from-yellow-400 to-orange-500`}>
       {query && (
        <Line setQuery={setQuery} query={query}/> 
       )}
    </div>
  );
}

export default App;
