import styles from './Map.module.css';
import "leaflet/dist/leaflet.css";

import { usePointContext } from '../../../contexts/PointContext';

import CreatePoint from '../../Forms/CreatePoint/CreatePoint';
import ListView from '../ListView/ListView';

import * as mapService from '../../../services/mapService';
import { initialPosition } from '../../../services/mapService'
import * as mapUIService from '../../../services/mapUIService';
import { FormInputData, Coordinates } from '../../../interfaces/pointInterfaces';

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import { useState, useEffect } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useMapContext } from '../../../contexts/MapContext';

export default function Map() {
	const { username } = useAuthContext();
	const { getPointsByUser, addPointByUser } = usePointContext();
	const { 
		mapRef,
		setIsFirstRender, 
		pointsOfInterest, 
		setPointsOfInterest } = useMapContext();

	const [userCoordinates, setUserCoordinates] = useState<Coordinates>(initialPosition);
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

	//Sets all user points
	useEffect(() => {
		//Retrives all points created by the user
		setPointsOfInterest(getPointsByUser(username));
		//Sets the current user location
		mapService.findUserLocation(mapRef, 13)
			.then(coordinates => {
				setUserCoordinates(coordinates);
			})
			.catch(error => {
				console.error('Error fetching user location:', (error as Error).message);
			});
	}, []);

	//Changes the dragging effect base on whether the form is opened
	useEffect(() => {
		mapService.changeDragging(mapRef, showCreateForm);
	}, [showCreateForm]);

	//Updates the pointsOfInterest and showFormState after creating new point
	const handleCreateFormSubmit = (formData: FormInputData) => {
		mapService
			.handleCreateFormSubmit(
				selectedPosition,
				formData,
				setPointsOfInterest,
				setShowCreateForm,
				addPointByUser,
				username
			);
	}

	function MyMapEvents() {
		useMapEvents({
			click: (e) => {
				setSelectedPosition([e.latlng.lat, e.latlng.lng]);
				setShowCreateForm(true);
				setIsFirstRender(false);
			}
		});

		return null;
	}

	function handleFormClose(e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) {
		if (e.target === e.currentTarget) {
			setShowCreateForm(false);
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

					{/* Sets click event depending on showCreateForm state */}
					{!showCreateForm 
						? <MyMapEvents />
						: null}

					{/* Renders all user's points of interest */}

					{pointsOfInterest.length > 0 
						? mapUIService.getAllPoints(pointsOfInterest)
						: null}


					{/* Renders create form when  */}
					{showCreateForm 
						? <CreatePoint
							onSubmit={handleCreateFormSubmit}
							onClose={handleFormClose} />
						: null}

					{/* Renders current user location  */}
					{!!userCoordinates
						? mapUIService.getUserPoint(userCoordinates, username)
						: null}

				</MapContainer>
			</section>

			<section className={styles['list-view']}>
				<ListView />
			</section>
		</div>
	)
}
