import styles from './Map.module.css';
import "leaflet/dist/leaflet.css";

import PointOfInterestForm from '../PointsOfInterestForm/PointsOfInterestForm';

import { FormInputData, PointOfInterest } from '../../interfaces/pointInterfaces';

import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useState, MouseEvent, useRef, useEffect } from 'react';

export default function Map() {
	const [pointsOfInterst, setPointsOfInterest] = useState<PointOfInterest[]>([]);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

	const mapRef = useRef<any>(null);

	const initialPosition: [number, number] = [42.6977, 23.3219];

	const handleFormSubmit = (formData: FormInputData) => {
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
				setSelectedPosition([e.latlng.lat, e.latlng.lng]);
				setShowForm(true);
			}
		});

		return null;
	}

	function handleFormClose(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			setShowForm(false);
		}
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

	// Disable dragging when form is opened
	useEffect(() => {
		if (mapRef.current) {
			const mapInstance = mapRef.current;

			showForm === true
				? mapInstance.dragging.disable()
				: mapInstance.dragging.enable();
		}
	}, [showForm]);

	return (
		<div className={styles['container']}>
			<MapContainer
				center={initialPosition}
				zoom={13}
				className={styles['map-container']}
				ref={mapRef}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>

				{!showForm && <MyMapEvents />}

				{pointsOfInterst.length > 0 && getAllPoints()}

				{showForm && (
					<PointOfInterestForm onCreate={handleFormSubmit} onClose={handleFormClose} />
				)}
			</MapContainer>
		</div>
	)
}
