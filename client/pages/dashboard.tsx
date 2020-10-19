import Map from '../components/map';
import DashFloat from '../components/DashFloat';
import DashBar from '../components/DashBar';
import DashList from '../components/DashList';
import AddButton from '../components/AddButton';
import RepeatSearch from '../components/RepeatSearch';

import { useEffect } from 'react';
import { loadMapApi } from '../utils/googleMapsUtils';
import { setScriptLoaded } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux';

function Dashboard() {
  const dispatch = useDispatch();
  const scriptLoad = useSelector((state: RootState) => state.scriptLoaded);

  const userCoords = useSelector((state: RootState) => state.coords);
  const showFloat = useSelector((state: RootState) => state.showFloat);
  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', () => {
      dispatch(setScriptLoaded(true));
    });
  }, []);

  const molletTestCoords = { latitude: 41.395017, longitude: 2.198577 };

  return (
    <>
      <DashBar />
      <AddButton />
      {/* <RepeatSearch /> */}
      {scriptLoad ? (
        // eslint-disable-next-line no-undef
        <Map
          mapType={google.maps.MapTypeId.ROADMAP}
          coords={molletTestCoords}
        />
      ) : (
        <p>Loading</p>
      )}
      {showFloat ? <DashFloat /> : ''}
      <DashList />
    </>
  );
}

export default Dashboard;
