/* global google */
import Map from '../components/map';
import DashFloat from '../components/DashFloat';
import DashBar from '../components/DashBar';
import DashList from '../components/DashList';
import AddButton from '../components/AddButton';

import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../types/redux';

import { setScriptLoaded } from '../redux/actions';

import { loadMapApi } from '../utils/googleMapsUtils';

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const divStyle = {
  height: '100%',
  width: '100%',
};

function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const scriptLoad = useSelector((state: RootState) => state.scriptLoaded);
  const showFloat = useSelector((state: RootState) => state.showFloat);
  const coordinates = useSelector((state: RootState) => state.userCoords);

  if (
    typeof window !== 'undefined' &&
    coordinates.longitude === 0 &&
    coordinates.latitude === 0
  )
    router.push('/');

  useEffect(() => {
    if (!scriptLoad) {
      const googleMapScript = loadMapApi();
      googleMapScript.addEventListener('load', () => {
        dispatch(setScriptLoaded(true));
      });
    }
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
        <AddButton
          click={() => router.push('/placeSelector')}
          text={'+'}
          finalPosition="0"
        />
        {/* <RepeatSearch /> */}
        {/* eslint-disable-next-line no-undef */}
        {scriptLoad && <Map mapType={google.maps.MapTypeId.ROADMAP} />}
        {showFloat ? <DashFloat /> : ''}
        <DashList />
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
