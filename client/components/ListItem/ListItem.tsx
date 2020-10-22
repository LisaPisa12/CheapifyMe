import { offer } from '../../types/redux';
import styles from './ListItem.module.css';

interface itemProp {
  offer: offer;
  name?: string;
}

function ListItem({ offer, name }: itemProp) {
  return (
    <div className={styles.item_container}>
      <div className={styles.consumable_container}>
        {offer.consumableType.toLowerCase() === 'food' ? (
          <img src="foodIcon.svg"></img>
        ) : (
          <img src="drinkIcon.svg"></img>
        )}
      </div>
      <div className={styles.item_text}>
        <h3>{offer.description}</h3>
        <div className={styles.text_img}>
          {offer.offerType === '2x1' ? (
            <img src="2x1.svg"></img>
          ) : offer.offerType === 'happy hour' ? (
            <img src="happyHour.svg"></img>
          ) : (
            <img src="discount.svg"></img>
          )}
        </div>
        <h4>{name}</h4>
      </div>
    </div>
  );
}

export default ListItem;
