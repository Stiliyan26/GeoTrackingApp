import styles from './LocationInterestPoint.module.css';

import { StyledPopup } from '../../services/mapUIService';

import { PointOfInterestProps } from '../../interfaces/pointInterfaces'
import interestLocationSvg from '/images/interest-location.svg';
import userLocationSvg from '/images/user-location.svg';

import L from "leaflet";
import { Marker } from "react-leaflet";

export default function LocationInterestPoint(
    { point, isUserLocation }: PointOfInterestProps
) {
    const customIcon = L.icon({
        iconUrl: isUserLocation
            ? userLocationSvg
            : interestLocationSvg,
        iconSize: [40, 40],
    });

    return (
        <Marker
            position={point.position}
            icon={customIcon}
        >
            <StyledPopup autoPanPadding={[150, 200]} autoPan={true}>
                <div className={styles['popup-container']}>
                    <h3 className={styles['popup-name']}>
                        {point.name}
                    </h3>

                    <hr className={styles['separator']}></hr>

                    <p className={styles['popup-category']}>
                        <span>Category:</span>
                        {point.category}
                    </p>

                    <p className={styles['popup-description']}>
                        <span>Description:</span>
                        {point.description}
                    </p>

                    <img
                        className={styles['popup-image']}
                        src={point.imageUrl}
                        alt='location image'
                    />
                </div>
            </StyledPopup>
        </Marker>
    )
}

