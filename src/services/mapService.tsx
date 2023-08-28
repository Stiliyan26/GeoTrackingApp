import { Dispatch, RefObject, SetStateAction } from "react";
import {
    AddPointByUserFunction,
    Coordinates,
    FormInputData,
    PointOfInterest
} from "../interfaces/pointInterfaces";

//Sets the current user location
export const findUserLocation =
    async (mapRef: RefObject<L.Map | null>, initialPosition: Coordinates): Promise<Coordinates> => {
        const geoLocationOptions = {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 5000
        }
        
        return new Promise<Coordinates>((resolve) => {
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
                    geoLocationOptions
                );
            } else {
                resolve(initialPosition);
            }
        });
    }

//Changes the dragging effect base on whether the form is opened
export const changeDragging = (mapRef: RefObject<L.Map | null>, showForm: boolean): void => {
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
            imageUrl: formData.imageUrl
        };
        
        //Update local state
        setPointsOfInterest(prev => [...prev, newPointOfInterest]);
        setShowForm(false);
        // Update local storage
        addPointByUser(newPointOfInterest, username);
    }
}



