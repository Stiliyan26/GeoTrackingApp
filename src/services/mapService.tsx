import { Dispatch, RefObject, SetStateAction } from "react";
import { AddPointByUserFunction, Coordinates, FormInputData, PointOfInterest } from "../interfaces/pointInterfaces";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";


import userLocationSvg from '../../public/images/user-location.svg';
import interestLocationSvg from '../../public/images/interest-location.svg';

//Sets the current user location
export const findUserLocation =
    async (mapRef: RefObject<any>, initialPosition: Coordinates): Promise<Coordinates> => {
        return new Promise<Coordinates>((resolve) => {
            const options = { enableHighAccuracy: true };

            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        if (mapRef.current) {
                            const { latitude, longitude } = position.coords;

                            mapRef.current.setView([latitude, longitude], 13);
                            resolve({ latitude, longitude });
                        }
                    },
                    (error) => {
                        if (error.code === error.PERMISSION_DENIED) {
                            console.error('User denied Geolocation. To enable location access, please adjust your browser settings.');
                        } else {
                            console.error('Error getting user location:', error.message);
                        }
                        resolve(initialPosition);
                    },
                    options
                );
            } else {
                resolve(initialPosition);
            }
        });
    }
//Changes the dragging effect base on whether the form is opened
export const changeDragging = (mapRef: RefObject<any>, showForm: boolean): void => {
    if (mapRef.current) {
        const mapInstance = mapRef.current;

        showForm === true
            ? mapInstance.dragging.disable()
            : mapInstance.dragging.enable();
    }
}

//Updates the pointsOfInterest and showForm states
export function handleFormSubmit(
    selectedPosition: [number, number] | null,
    formData: FormInputData,
    setPointsOfInterest: Dispatch<SetStateAction<PointOfInterest[]>>,
    setShowForm: Dispatch<SetStateAction<boolean>>,
    addPointByUser: AddPointByUserFunction,
    username: string
) {
    if (selectedPosition) {
        const newPointOfInterest: PointOfInterest = {
            position: selectedPosition,
            name: formData.name,
            description: formData.description,
            category: formData.category,
        };
        // Update local storage
        addPointByUser(newPointOfInterest, username);
        //Update local state
        setPointsOfInterest(prev => [...prev, newPointOfInterest]);
        setShowForm(false);
    }
}

//Returns all points of interest of the current user
export const getAllPoints = (pointsOfInterst: PointOfInterest[]) => {
    const customIcon = L.icon({
        iconUrl: interestLocationSvg,
        iconSize: [40, 40],
    });

    return pointsOfInterst
        .map((poi, index) => (
            <Marker 
                key={index} 
                position={poi.position}
                icon={customIcon}
            >
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

export const getUserPoint = (
    userCoordinates: Coordinates,
    username: string, 
    styles: any
) => {
    const customIcon = L.icon({
        iconUrl: userLocationSvg,
        iconSize: [40, 40],
    });

    return (
        <Marker 
            position={[userCoordinates.latitude, userCoordinates.longitude]}
            icon={customIcon}
        >
            <Popup>
                <div className={styles['popup-container']}>
                    <h3 className={styles['popup__title']}>{username}'s Location</h3>
                    <p className={styles['popup__category']}>Current Location</p>
                    <p className={styles['popup__description']}>This is my current location!</p>
                </div>
            </Popup>
        </Marker>
    )
}