import { place } from '../../types/redux';
import styles from './ListItem.module.css';

interface itemProp {
  place: place;
}

function ListItem({ place }: itemProp) {
  return (
    <div className={styles.item_container}>
      <div className={styles.item_text}>
        {place.offers.map((el, i) => (
          <h3 key={i}>{el.description}</h3>
        ))}
        <h4>{place.name}</h4>
      </div>
    </div>
  );
}

export default ListItem;
