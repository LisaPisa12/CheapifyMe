import Map from '../components/map';
import DashFloat from '../components/DashFloat';
import DashBar from '../components/DashBar';
import DashList from '../components/DashList';
import AddButton from '../components/AddButton';
import RepeatSearch from '../components/RepeatSearch';

import { useState, useEffect } from 'react';
import { loadMapApi } from '../utils/googleMapsUtils';

import { useSelector } from 'react-redux';
import { RootState } from '../types/redux';

function Dashboard() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const userCoords = useSelector((state: RootState) => state.coords);
  const showFloat = useSelector((state: RootState) => state.showFloat);
  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', () => {
      setTimeout(() => setScriptLoaded(true), 2000);
    });
  }, []);

  return (
    <>
      <DashBar />
      <AddButton />
      {/* <RepeatSearch /> */}
      {scriptLoaded ? (
        // eslint-disable-next-line no-undef
        <Map mapType={google.maps.MapTypeId.ROADMAP} coords={userCoords} />
      ) : (
        <p>Loading</p>
      )}
      {showFloat ? <DashFloat /> : ''}
      <DashList />
    </>
  );
}

export default Dashboard;
