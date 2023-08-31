import styles from './FilterSortBar.module.css';

import { findUserLocation } from '../../../../services/mapService';
import { getClassNameByToggle } from '../../../../services/styleServices';
import { FilterSortBarProps, SortOptions } from '../../../../interfaces/pointInterfaces';

import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function FilterSortBar({
	handleSetSortQuery,
	handleSearchChange,
	searchQuery,
	mapRef
}: FilterSortBarProps) {
	const [isActive, setIsActive] = useState<boolean>(false);

	const sortOptions: SortOptions[] = [
		{ label: 'Category', name: 'category' },
		{ label: 'Name', name: 'name' },
		{ label: 'Default', name: 'default' }
	]

	const getSortOptions = () =>
		sortOptions
			.map((option, index) => (
				<Link onClick={() => handleSetSortQuery(option.name)} key={index} to="">
					<span></span>{option.label}
				</Link>
			)
		);

	function handleToggle() {
		setIsActive(prev => !prev);
	}

	return (
		<div className={styles['filter-sort-container']}>
			<section className={styles['sort-wrapper']}>
				<button
					onClick={handleToggle}
					className={getClassNameByToggle(styles, isActive, 'sort-btn', 'active')}
				>
					Sort by
					<span className={styles['left-icon']}></span>
					<span className={styles['right-icon']}></span>
				</button>

				<div className={styles['sort-items']}>
					{!!sortOptions && getSortOptions()}
				</div>
			</section>

			<section className={styles['search-bar']}>
				<input
					onChange={handleSearchChange}
					className={styles['search-inp']}
					type='text'
					placeholder='Seach by category'
					name='search-inp'
					value={searchQuery}
				/>

				<i className="fa-solid fa-magnifying-glass"></i>
			</section>

			<button
				onClick={() => findUserLocation(mapRef, 13)}
				className={styles['my-position-btn']}
			>
				Locate my position
			</button>
		</div>
	)
}
