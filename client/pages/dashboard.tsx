import Map from '../components/map';

import { useState, useEffect } from 'react';
import { loadMapApi } from '../utils/googleMapsUtils';

function Dashboard() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

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
        <Map mapType={google.maps.MapTypeId.ROADMAP} />
      )}
    </>
  );
}

export default Dashboard;
