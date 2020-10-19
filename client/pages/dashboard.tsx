import Map from '../components/map';
import DashFloat from '../components/DashFloat';
import DashBar from '../components/DashBar';
import DashList from '../components/DashList';
import AddButton from '../components/AddButton';

import { motion } from 'framer-motion';

import { useEffect } from 'react';
import { loadMapApi } from '../utils/googleMapsUtils';
import { setScriptLoaded } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux';

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const mapAppear = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
  },
};

const divStyle = {
  height: '100%',
  width: '100%',
};

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

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      style={divStyle}
    >
      <motion.div variants={stagger} style={divStyle}>
        <DashBar />
        <AddButton />
        {/* <RepeatSearch /> */}
        {scriptLoad && (
          /* eslint-disable-next-line no-undef */
          <Map mapType={google.maps.MapTypeId.ROADMAP} coords={userCoords} />
        )}
        {showFloat ? <DashFloat /> : ''}
        <DashList />
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
