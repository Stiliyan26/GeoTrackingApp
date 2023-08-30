import { MutableRefObject } from "react";
import ListLocation from "../components/Pages/ListView/ListLocation/ListLocation";
import LocationInterestPoint from "../components/Pages/LocationInterestPoint/LocationInterestPoint";

import { 
    Coordinates, 
    HandleShowDialogFunction, 
    PointOfInterest, 
    PointOfInterestWithIndex, 
    SortQueries
} from "../interfaces/pointInterfaces";
import { Popup } from "react-leaflet";

import styled from "styled-components";

//Returns user current location point
export const getUserPoint = (
    userCoordinates: Coordinates,
    username: string,
) => {
    const pointInfo: PointOfInterest = {
        position: [userCoordinates?.latitude, userCoordinates?.longitude],
        name: `${username}'s Location`,
        category: 'Current Location',
        description: 'This is my current location!',
        imageUrl: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg'
    }

    return (
        <LocationInterestPoint
            point={pointInfo}
            isUserLocation={true}
        />
    )
}

//Returns all location points of interest of the current user
export const getAllPoints = (pointsOfInterest: PointOfInterest[]) => {

    return pointsOfInterest
        .map(point => (
            <LocationInterestPoint 
                key={genereteRandomKey()}
                point={point}
                isUserLocation={false}
            />
        ));
}

//Returns styled popup
export const StyledPopup = styled(Popup)`
        a.leaflet-popup-close-button {
            color: red;
            font-size: 30px;
            margin: 10px;
            position: absolute;
        }

        .leaflet-popup-content-wrapper,
        .leaflet-popup-tip {
            background-color: #023e8a;
            border-radius: 2em;
        }

        .leaflet-popup-content {
            padding: 13px 20px;
            margin: 0px;
        }

        .leaflet-popup-content p {
            margin-top: 10px;
            margin-bottom: 10px;
        }
    `;


export const genereteRandomKey =() => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
//Maps the point to components 
export const mapPointsToComponents = (
    points: PointOfInterestWithIndex[],
    mapRef: MutableRefObject<L.Map | null>,
    isFirstRender: boolean,
    handleShowDialog: HandleShowDialogFunction
) => 
    points.map((point, index) => (
        <ListLocation key={point.id}
            index={index}
            point={point}
            mapRef={mapRef}
            isFirstRender={isFirstRender}
            handleShowDialog={handleShowDialog}
        />
));

//Retrieves the sorting expressions
export const sortQueries: SortQueries = {
    'category': (a: PointOfInterestWithIndex, b: PointOfInterestWithIndex) =>
        a.category.localeCompare(b.category),
    'name': (a: PointOfInterestWithIndex, b: PointOfInterestWithIndex) =>
        a.name.localeCompare(b.name),
    'default': (a: PointOfInterestWithIndex, b: PointOfInterestWithIndex) =>
        a.index - b.index
}


