import Map from '../components/map';
import DashFloat from '../components/DashFloat';
import DashBar from '../components/DashBar';
import DashList from '../components/DashList';
import AddButton from '../components/AddButton';

import { motion } from 'framer-motion';

import { useSelector } from 'react-redux';
import { RootState } from '../types/redux';

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
  const showFloat = useSelector((state: RootState) => state.showFloat);

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
        {/* eslint-disable-next-line no-undef */}
        <Map mapType={google.maps.MapTypeId.ROADMAP} />
        {showFloat ? <DashFloat /> : ''}
        <DashList />
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
