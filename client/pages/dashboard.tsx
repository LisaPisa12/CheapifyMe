import Map from '../components/map';

import { useState, useEffect } from 'react';
import { loadMapApi } from '../utils/googleMapsUtils';

import { useSelector } from 'react-redux';
import { RootState } from '../types/redux';

function Dashboard() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const userCoords = useSelector((state: RootState) => state.coords);

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', () => {
      setTimeout(() => setScriptLoaded(true), 2000);
    });
  }, []);

  return (
    <>
      {scriptLoaded ? (
        // eslint-disable-next-line no-undef
        <Map mapType={google.maps.MapTypeId.ROADMAP} coords={userCoords} />
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default Dashboard;
