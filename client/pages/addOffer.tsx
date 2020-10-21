import styles from '../styles/addOffer.module.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { setNewOffer, setScriptLoaded } from '../redux/actions';
import { RootState } from '../types/redux';
import { insertOffer } from '../Apollo';
import { animate, motion, useAnimation, transform } from 'framer-motion';

import { loadMapApi } from '../utils/googleMapsUtils';
const easing = [0.6, -0.05, 0.01, 0.99];

const maxLength = 50;
const mapRemainingToColor = transform([2, 6], ['#ff008c', '#ccc']);
const mapRemainingToSpringVelocity = transform([0, 5], [50, 0]);

const AnimateConsumable = {
  initial: {
    y: -300
  },
  animate: {
    y: 200,
    transition: {
      duration: 1.4,
      ease: easing
    }
  },
  clicked: {
    y: 0,
    transition: {
      duration: 1.4,
      ease: easing
    }
  }
};
const AnimateOfferType = {
  initial: {
    y: 600
  },
  animate: {
    y: 100,
    transition: {
      duration: 1.6,
      ease: easing
    }
  },
  clicked: {
    y: 0,
    transition: {
      duration: 1.2,
      ease: easing
    }
  }
};

const AnimateTime = {
  initial: {
    x: 600
  },
  animate: {
    x: 0,
    transition: {
      duration: 2,
      ease: easing
    }
  }
};
const AnimateDescription = {
  initial: {
    x: -600
  },
  animate: {
    x: 0,
    transition: {
      duration: 2,
      ease: easing
    }
  }
};

export default function addOffer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const scriptLoad = useSelector((state: RootState) => state.scriptLoaded);
  const thisId = useSelector((state: RootState) => state.selectedId);
  const places = useSelector((state: RootState) => state.places);
  const newPlace = useSelector((state: RootState) => state.newPlace);
  let thisPlace: any;
  let location: any;

  const coordinates = useSelector((state: RootState) => state.userCoords);

  const coordsNotProvided =
    typeof window !== 'undefined' &&
    coordinates.longitude === 0 &&
    coordinates.latitude === 0;
  const placeNotProvided = typeof window !== 'undefined' && thisId;

  if (coordsNotProvided || placeNotProvided) router.push('/');

  useEffect(() => {
    if (!scriptLoad) {
      const googleMapScript = loadMapApi();
      googleMapScript.addEventListener('load', () => {
        dispatch(setScriptLoaded(true));
      });
    }
  }, []);

  if (newPlace) {
    thisPlace = newPlace;
    location = {
      type: 'Point',
      coordinates: [thisPlace.location.lat, thisPlace.location.lng],
    };
  } else if (places.length > 0) {
    thisPlace = places[thisId];
    console.log(thisPlace);
    location = thisPlace.location;
  }

  const [mutateOffer] = useMutation(insertOffer);

  const [dates, setDates] = useState({
    start: new Date(),
    end: new Date()
  });
  const [thisOffer, setThisOffer] = useState({
    consumableType: '',
    offerType: '',
    start: '',
    end: '',
    repeat: false,
    repeatEvery: undefined,
    description: '',
  });

  const charactersRemaining = maxLength - thisOffer.description.length;
  const controls = useAnimation();
  useEffect(() => {
    if (charactersRemaining > 6) return;

    controls.start({
      scale: 1,
      transition: {
        type: 'spring',
        velocity: mapRemainingToSpringVelocity(charactersRemaining),
        stiffness: 700,
        damping: 80
      }
    });
  }, [thisOffer.description.length]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const value = e.target.value;
    if (e.target.name === 'repeat') {
      if (value === 'on') {
        setThisOffer({ ...thisOffer, [e.target.name]: true });
      }
    } else {
      setThisOffer({ ...thisOffer, [e.target.name]: value });
    }
  }

<<<<<<< HEAD
  const router = useRouter();
=======
>>>>>>> feat(client): location things
  return (
    scriptLoad && (
      <motion.div
        exit="exit"
        initial="initial"
        animate="animate"
        className={styles.motion_container}
      >
        <section className={styles.section}>
          <article className={styles.restaurantData}>
            {scriptLoad && thisPlace ? <h2>{thisPlace?.name}</h2> : ''}
          </article>
          <motion.div
            variants={AnimateConsumable}
            animate={thisOffer.consumableType ? 'clicked' : 'animate'}
          >
            <article className={styles.formContainer}>
              <h2>Type</h2>
              <div className={styles.offersType}>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    className={styles.hidden_button}
                    type="radio"
                    id="food"
                    name="consumableType"
                    value="food"
                    onChange={handleChange}
                  />
                  <label htmlFor="food">
                    <img
                      src="testfoodIcon.svg"
                      alt=""
                      className={styles.icon}
                    />
                  </label>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    className={styles.hidden_button}
                    type="radio"
                    id="drink"
                    name="consumableType"
                    value="drink"
                    onChange={handleChange}
                  />

                  <label htmlFor="drink">
                    <img
                      src="testdrinkIcon.svg"
                      alt="test"
                      className={styles.icon}
                    />
                  </label>
                </motion.div>
              </div>
            </article>
          </motion.div>
          {thisOffer.consumableType ? (
            <motion.div
              variants={AnimateOfferType}
              animate={thisOffer.offerType ? 'clicked' : 'animate'}
            >
              <article className={styles.formContainer}>
                <h2>Offer type</h2>
                <div className={styles.offersType}>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <input
                      className={styles.hidden_button}
                      type="radio"
                      id="2x1"
                      name="offerType"
                      value="2x1"
                      onChange={handleChange}
                    />
                    <label htmlFor="2x1">
                      <img src="test2X1.svg" alt="" className={styles.icon} />
                    </label>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <input
                      className={styles.hidden_button}
                      type="radio"
                      id="happy"
                      name="offerType"
                      value="happy hour"
                      onChange={handleChange}
                    />
                    <label htmlFor="happy">
                      <img src="testHappy.svg" alt="" className={styles.icon} />
                    </label>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <input
                      className={styles.hidden_button}
                      type="radio"
                      id="percent"
                      name="offerType"
                      value="Percentage"
                      onChange={handleChange}
                    />
                    <label htmlFor="percent">
                      <img src="test2X1.svg" alt="" className={styles.icon} />
                    </label>
                  </motion.div>
                </div>
              </article>
            </motion.div>
          ) : (
            ''
          )}
          {thisOffer.offerType ? (
            <motion.div
              variants={AnimateTime}
              animate={thisOffer.end ? 'clicked' : 'animate'}
            >
              <article className={styles.formContainer}>
                <h2>Dates</h2>
                <div className={styles.offersType}>
                  <div className={styles.dates}>
                    <label>Start</label>
                    <DatePicker
                      placeholderText="Click to select start date"
                      minDate={new Date()}
                      selected={dates.start}
                      onChange={(date) => {
                        if (date instanceof Date) {
                          setDates({ ...dates, start: date });
                          setThisOffer({
                            ...thisOffer,
                            start: date.toLocaleString()
                          });
                        }
                      }}
                      timeFormat="p"
                      timeIntervals={30}
                      dateFormat="Pp"
                      startDate={dates.start}
                      endDate={dates.end}
                      name="start"
                      showTimeSelect
                    />
                  </div>
                  <div className={styles.dates}>
                    <label>End</label>
                    <DatePicker
                      placeholderText="Click to select end date"
                      selected={dates.end}
                      onChange={(date) => {
                        if (date instanceof Date) {
                          setDates({ ...dates, end: date });
                          setThisOffer({
                            ...thisOffer,
                            end: date.toLocaleString()
                          });
                        }
                      }}
                      minDate={dates.start}
                      timeFormat="p"
                      timeIntervals={30}
                      dateFormat="Pp"
                      startDate={dates.start}
                      endDate={dates.end}
                      name="start"
                      showTimeSelect
                      popperPlacement="bottom-end"
                      popperModifiers={{
                        offset: {
                          enabled: true,
                          offset: '5px, 10px'
                        },
                        preventOverflow: {
                          enabled: true,
                          escapeWithReference: false,
                          boundariesElement: 'viewport'
                        }
                      }}
                    />
                  </div>
                </div>
              </article>
            </motion.div>
          ) : (
            ''
          )}
          {thisOffer.end ? (
            <motion.div variants={AnimateDescription}>
              <article className={styles.formContainer}>
                <h2>Description of the offer</h2>
                <div className={styles.offersType}>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={thisOffer.description}
                    className={styles.input}
                    onChange={handleChange}
                  />
                  <div className={styles.container}>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={controls}
                      style={{
                        color: mapRemainingToColor(charactersRemaining)
                      }}
                    >
                      {charactersRemaining}
                    </motion.span>
                  </div>
                </div>
              </article>
            </motion.div>
          ) : (
            ''
          )}
          {thisOffer.description ? (
            <motion.div
              positionTransition
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 1,
                  ease: easing
                }
              }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <article className={styles.formContainer}>
                <button
                  onClick={async () => {
                    const newOffer = await mutateOffer({
                      variables: {
                        id: thisPlace.id,
                        name: thisPlace.name,
                        location: location,
                        offer: thisOffer
                      }
                    });

                    dispatch(setNewOffer(newOffer.data.insertOffer));

                    router.push('/dashboard');
                  }}
                >
                  Send offer
                </button>
              </article>
            </motion.div>
          ) : (
            ''
          )}
        </section>
      </motion.div>
    )
  );
}
