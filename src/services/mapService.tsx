import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import {
    AddPointByUserFunction,
    Coordinates,
    DeletePointFunction,
    EditPointFunction,
    FormInputData,
    HandleShowDialogFunction,
    PointOfInterest
} from "../interfaces/pointInterfaces";

import { mapPointsToComponents, sortQueries } from "./mapUIService";
import { genereteRandomKey } from "./mapUIService";

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
export const changeDragging = (mapRef: RefObject<L.Map | null>, showFormOrDialog: boolean): void => {
    if (mapRef.current) {
        const mapInstance = mapRef.current;

        showFormOrDialog === true
            ? mapInstance.dragging.disable()
            : mapInstance.dragging.enable();
    }
}

//Updates the pointsOfInterest and showCreateForm states
export function handleCreateFormSubmit(
    selectedPosition: [number, number] | null,
    formData: FormInputData,
    setPointsOfInterest: Dispatch<SetStateAction<PointOfInterest[]>>,
    setShowCreateForm: Dispatch<SetStateAction<boolean>>,
    addPointByUser: AddPointByUserFunction,
    username: string
) {
    if (selectedPosition) {
        const newPointOfInterest: PointOfInterest = {
            id: genereteRandomKey(),
            position: selectedPosition,
            name: formData.name,
            description: formData.description,
            category: formData.category,
            imageUrl: formData.imageUrl
        };

        //Update local state
        setPointsOfInterest(prev => [...prev, newPointOfInterest]);
        setShowCreateForm(false);
        // Update local storage
        addPointByUser(newPointOfInterest, username);
    }
}

//Updates pointsOfInterest and setShowEditForm states
export function handleEditFormSubmit(
    setShowEditForm: Dispatch<SetStateAction<boolean>>,
    setPointsOfInterest: Dispatch<SetStateAction<PointOfInterest[]>>,
    editPointById: EditPointFunction,
    currentPointId: string,
    username: string,
    formData: FormInputData,
) {
    setShowEditForm(false);
    setPointsOfInterest(prev => {
        const updatedPoints = prev
            .map(point => {
                if (point.id === currentPointId) {
                    return {
                        ...point,
                        name: formData.name,
                        category: formData.category,
                        description: formData.description,
                        imageUrl: formData.imageUrl
                    };
                }

                return point;
            });

        return updatedPoints;
    });

    editPointById(formData, currentPointId, username);
}

//Removes point by id and updates the state of pointOfInterest
export function handleDeletePoint(
    setPointsOfInterest: Dispatch<SetStateAction<PointOfInterest[]>>,
    deletePointById: DeletePointFunction,
    id: string,
    username: string
){
    setPointsOfInterest(prev => {
        let filteredPoints = prev;

        filteredPoints = filteredPoints
            .filter(point => point.id !== id)

        return filteredPoints;
    })

    deletePointById(id, username);
}

//Retrives pointsOfInterest based on the search and sort query
export const getListLocations = (
    pointsOfInterest: PointOfInterest[],
    sortQuery: string,
    searchQuery: string,
    mapRef: MutableRefObject<L.Map | null>,
    isFirstRender: boolean,
    handleShowDialog: HandleShowDialogFunction
) => {
    const pointsOfInterestWithIndex = pointsOfInterest
            .map((point, index) => ({
                ...point,
                index
            }))

        if (!sortQuery && !searchQuery) {
            return mapPointsToComponents(pointsOfInterestWithIndex, mapRef, isFirstRender, handleShowDialog);
        }

        if (sortQuery && sortQueries.hasOwnProperty(sortQuery)) {
            const sortedPoints = pointsOfInterestWithIndex
                .sort(sortQueries[sortQuery]);

            return mapPointsToComponents(sortedPoints, mapRef, isFirstRender, handleShowDialog);
        }

        const filteredPoints = pointsOfInterestWithIndex.filter(point =>
            point.category.trim().toLocaleLowerCase()
                .includes(searchQuery.trim().toLocaleLowerCase()))

        return mapPointsToComponents(filteredPoints, mapRef, isFirstRender, handleShowDialog);
}


