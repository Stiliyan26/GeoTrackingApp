import styles from './ListLocation.module.css';

import { ListLocationProps } from "../../../../interfaces/pointInterfaces";
import { getProperClassName } from '../../../../services/styleServices';

export default function ListLocation(
	{ index, point, mapRef, isFirstRender }: ListLocationProps
) {

	const showCoordinates = () => {
		return `[${point.position[0].toFixed(2)}, ${point.position[1].toFixed(2)}]`
	}

	// Centers selected location
	function handleLocate() {
		if (mapRef.current) {
			mapRef.current.setView(point.position);
		}
	}

	return (
		<section
			className={getProperClassName(
				styles,
				'point-info-container',
				'point-info-container-with-anim',
				isFirstRender
			)}
			style={{ animationDelay: `${index * 0.2}s` }}
		>
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

			<button onClick={handleLocate} className={styles['locate-btn']}>
				<span className={styles['btn-name']}>Locate</span>
				<span className={styles['btn-coordinates']}>{showCoordinates()}</span>
			</button>
		</section>
	)
}
