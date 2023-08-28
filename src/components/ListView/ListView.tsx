import styles from './ListView.module.css';

import { ListViewProps } from "../../interfaces/pointInterfaces"

export default function ListView(
  { point }: ListViewProps
) {
  return (
    <div className={styles['point-info-container']}>
      <div className={styles['column']}>
        <section className={styles['name-container']}>
          <span className={styles['point-name']}>Name: {point.name}</span>
          <i className="fa-sharp fa-regular fa-location-dot"></i>
        </section>

        <section className={styles['category-container']}>
          <span className={styles['point-category']}>Category: {point.category}</span>
          <i className="fa-solid fa-list"></i>
        </section>
      </div>

      <button>Locate</button>
    </div>
  )
}
