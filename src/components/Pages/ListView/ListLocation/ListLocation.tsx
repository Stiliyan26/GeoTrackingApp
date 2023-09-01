import styles from './ListLocation.module.css';

import { handleLocate } from '../../../../services/mapService';

import { Action, ListLocationProps } from "../../../../interfaces/pointInterfaces";
import { getProperClassName } from '../../../../services/styleServices';

export default function ListLocation({
	index,
	point,
	mapRef,
	isFirstRender,
	handleShowDialog
}: ListLocationProps
) {
	const showCoordinates = () => {
		return `[${point.position[0].toFixed(2)}, ${point.position[1].toFixed(2)}]`
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
					<span className={styles['point-name']}>{point.name}</span>
					<i className="fa-sharp fa-regular fa-location-dot"></i>
				</section>

				<section className={styles['category-container']}>
					<span className={styles['point-category']}>Category: {point.category}</span>
					<i className="fa-solid fa-list"></i>
				</section>
			</div>

			<div className={styles['button-wrapper']}>
				<button onClick={() => handleLocate(mapRef, point)} className={styles['locate-btn']}>
					<span className={styles['btn-name']}>Locate</span>
					<span className={styles['btn-coordinates']}>{showCoordinates()}</span>
				</button>

				<button
					onClick={(e) => handleShowDialog(Action.Edit, point, e)}
					className={styles['edit-btn']}
				>
					Edit
				</button>

				<button
					onClick={(e) => handleShowDialog(Action.Delete, point, e)}
					className={styles['delete-btn']}
				>
					Delete
				</button>
			</div>
		</section>

	)
}
