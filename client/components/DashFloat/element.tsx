import { ReactElement, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './DashFloat.module.css';

import { place, RootState } from '../../types/redux';
import { useSelector, useDispatch } from 'react-redux';

import { setCoordinates, setSelectedId } from '../../redux/actions';

type IWatchedElement = {
  children: ReactElement;
  place: place;
  index: number;
};

export const WatchedElement = ({ children, place, index }: IWatchedElement) => {
  const places = useSelector((state: RootState) => state.places);
  const thisId = useSelector((state: RootState) => state.selectedId);

  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 1,
  });

  if (inView) {
    if (place.location) {
      const [latitude, longitude] = place.location.coordinates;
      const coords = { latitude, longitude };
      if (place.id === places[thisId].id) dispatch(setCoordinates(coords));
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (inView) dispatch(setSelectedId(index));
    }, 100);
  }, [inView]);

  return (
    <span ref={ref} className={styles.WatchedElement}>
      {children}
    </span>
  );
};
