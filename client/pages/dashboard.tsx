import Map from '../components/map';

import { useState, useEffect, useContext } from 'react';
import { loadMapApi } from '../utils/googleMapsUtils';

import { CoordsContext } from '../hooks/useCoords';

function Dashboard() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const { coords } = useContext(CoordsContext);

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', () => {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <>
      {scriptLoaded && (
        // eslint-disable-next-line no-undef
        <Map mapType={google.maps.MapTypeId.ROADMAP} coords={coords} />
      )}
    </>
  );
}

export default Dashboard;
