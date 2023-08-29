import styles from './Map.module.css';
import "leaflet/dist/leaflet.css";

import { usePointContext } from '../../../contexts/PointContext';

import CreatePoint from '../../Forms/CreatePoint/CreatePoint';
import ListView from '../ListView/ListView';

import * as mapService from '../../../services/mapService';
import * as mapUIService from '../../../services/mapUIService';
import { FormInputData, PointOfInterest, Coordinates } from '../../../interfaces/pointInterfaces';

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useState, MouseEvent, useRef, useEffect } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';

export default function Map() {
	const { username } = useAuthContext();
	const { getPointsByUser, addPointByUser } = usePointContext();

	const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>([]);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

	const initialPosition: Coordinates
		= { latitude: 42.6977, longitude: 23.3219 };

	const [userCoordinates, setUserCoordinates] = useState<Coordinates>(initialPosition);

	const mapRef = useRef<L.Map | null>(null);

	//Sets all user points
	useEffect(() => {
		//Retrives all points created by the user
		setPointsOfInterest(getPointsByUser(username));
		//Sets the current user location
		mapService.findUserLocation(mapRef, initialPosition)
			.then(coordinates => {
				setUserCoordinates(coordinates);
			})
			.catch(error => {
				console.error('Error fetching user location:', (error as Error).message);
			});
	}, []);

	//Changes the dragging effect base on whether the form is opened
	useEffect(() => {
		mapService.changeDragging(mapRef, showForm);
	}, [showForm]);

	//Updates the pointsOfInterest and showFormState after creating new point
	const handleFormSubmit = (formData: FormInputData) => {
		mapService
			.handleFormSubmit(
				selectedPosition,
				formData,
				setPointsOfInterest,
				setShowForm,
				addPointByUser,
				username
			);

		setIsFirstRender(false);
	}

	function MyMapEvents() {
		useMapEvents({
			click: (e) => {
				setSelectedPosition([e.latlng.lat, e.latlng.lng]);
				setShowForm(true);
				setIsFirstRender(false);
			}
		});

		return null;
	}

	function handleFormClose(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			setShowForm(false);
		}
	}

	return (
		<div className={styles['container']}>
			<section className={styles['map-container']}>
				<MapContainer
					center={[initialPosition.latitude, initialPosition.longitude]}
					zoom={13}
					className={styles['map']}
					ref={mapRef}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>

					{/* Sets click event depending on showForm state */}
					{!showForm && <MyMapEvents />}

					{/* Renders all use's points of interest */}
					{pointsOfInterest.length > 0 &&
						mapUIService.getAllPoints(pointsOfInterest)}

					{/* Renders create form when  */}
					{showForm && (
						<CreatePoint
							onCreate={handleFormSubmit}
							onClose={handleFormClose}
						/>
					)}

					{/* Renders current user location  */}
					{!!userCoordinates
						&& mapUIService.getUserPoint(userCoordinates, username)}

				</MapContainer>
			</section>
			
			<section className={styles['list-view']}>
				<ListView 
					setIsFirstRender={setIsFirstRender}
					pointsOfInterest={pointsOfInterest}
					mapRef={mapRef}
					isFirstRender={isFirstRender}
					setPointsOfInterest={setPointsOfInterest}
				/>
			</section>
		</div>
	)
}