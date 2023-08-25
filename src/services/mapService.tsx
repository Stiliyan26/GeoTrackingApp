import { Dispatch, RefObject, SetStateAction } from "react";
import { Coordinates, FormInputData, PointOfInterest } from "../interfaces/pointInterfaces";
import { Marker, Popup } from "react-leaflet";

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

//Creates new point of interest and updates the state
export function handleFormSubmit(
    selectedPosition: [number, number] | null,
    formData: FormInputData,
    setPointsOfInterest: Dispatch<SetStateAction<PointOfInterest[]>>,
    setShowForm: Dispatch<SetStateAction<boolean>>
) {
    if (selectedPosition) {
        const newPointOfInterest: PointOfInterest = {
            position: selectedPosition,
            name: formData.name,
            description: formData.description,
            category: formData.category,
        };

        updatePointOfInterestAndShowForm(
            newPointOfInterest,
            setPointsOfInterest,
            setShowForm);
    }
}

//Updates the pointsOfInterest and showForm states
function updatePointOfInterestAndShowForm(
    newPointOfInterest: PointOfInterest,
    setPointsOfInterest: Dispatch<SetStateAction<PointOfInterest[]>>,
    setShowForm: Dispatch<SetStateAction<boolean>>
) {
    setPointsOfInterest(prev => [...prev, newPointOfInterest]);
    setShowForm(false);
}

//Returns all points of interest of the current user
export const getAllPoints = (pointsOfInterst: PointOfInterest[]) => {
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

export const getUserPoint = (userCoordinates: Coordinates) => {
    return (
        <Marker position={[userCoordinates.latitude, userCoordinates.longitude]}>
            <Popup>
                <div>
                    <h3>Stili's House</h3>
                    <p>I am on the beach</p>
                    <p>Vacation</p>
                </div>
            </Popup>
        </Marker>
    )
}