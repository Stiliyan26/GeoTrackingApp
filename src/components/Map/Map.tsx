import styles from './Map.module.css';

import PointOfInterestForm from '../PointsOfInterestForm/PointsOfInterestForm';

import { PointOfInterest } from '../../interfaces/pointInterfaces';

import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from 'react';

export default function Map() {
	const initialPosition: [number, number] = [51.505, -0.09];
	const [pointsOfInterst, setPointsOfInterest] = useState<PointOfInterest[]>([]);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

	const handleFormSubmit = (formData: PointOfInterest) => {
		if (selectedPosition) {
			const newPointOfInterest: PointOfInterest = {
				position: selectedPosition,
				name: formData.name,
				description: formData.description,
				category: formData.category
			};

			setPointsOfInterest(prev => [...prev, newPointOfInterest])
			setShowForm(false);
		}
	}

	function MyMapEvents() {
		useMapEvents({
			click: (e) => {
				console.log([e.latlng.lat, e.latlng.lng]);
				setSelectedPosition([e.latlng.lat, e.latlng.lng]);
				setShowForm(true);
			}
		});
		return null;
	}

	const getAllPoints = () => {
		return pointsOfInterst
			.map((poi, index) => (
				<Marker key={index} position={poi.position}>
					<Popup>
						<div>
							<h3>{poi.name}</h3>
							<p>{poi.description}</p>
							<p>Category: {poi.category}</p>
						</div>
					</Popup>
				</Marker>
			));
	}

	return (
		<div className={styles['map-container']}>
			<MapContainer
				center={initialPosition}
				zoom={13}
				style={{ height: '100%', width: '100%' }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>

				{!showForm && <MyMapEvents />}

				{pointsOfInterst.length > 0 && getAllPoints()}

				{showForm && (
					<div className={styles['form-container']}>
						<PointOfInterestForm onSubmit={handleFormSubmit} />
					</div>
				)}
			</MapContainer>
		</div>
	)
}
