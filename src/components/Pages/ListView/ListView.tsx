import styles from './ListView.module.css';

import FilterSortBar from "./FilterSortBar/FilterSortBar";

import * as mapUIService from '../../../services/mapUIService';

import { ListViewProps, PointOfInterestWithIndex } from '../../../interfaces/pointInterfaces';
import { ChangeEvent, useMemo, useState } from 'react';
import ListLocation from './ListLocation/ListLocation';

interface SortQueries {
    [key: string]: (
        a: PointOfInterestWithIndex,
        b: PointOfInterestWithIndex) => number;
}

export default function ListView({
    setIsFirstRender,
    pointsOfInterest,
    mapRef,
    isFirstRender
}: ListViewProps) {
    const [sortQuery, setSortQuery] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSetSortQuery = (name: string) => {
        setSortQuery(name);
        setSearchQuery('');
        setIsFirstRender(false);
    }

    function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchQuery(e.target.value);
        setSortQuery('');
        setIsFirstRender(false);
    }

    const sortQueries: SortQueries = {
        'category': (a: PointOfInterestWithIndex, b: PointOfInterestWithIndex) =>
            a.category.localeCompare(b.category),
        'name': (a: PointOfInterestWithIndex, b: PointOfInterestWithIndex) =>
            a.name.localeCompare(b.name),
        'default': (a: PointOfInterestWithIndex, b: PointOfInterestWithIndex) =>
            a.index - b.index
    }

    const mapPointsToComponents = (points: PointOfInterestWithIndex[]) => 
        points.map((point, index) => (
            <ListLocation key={mapUIService.genereteRandomKey()}
                index={index}
                point={point}
                mapRef={mapRef}
                isFirstRender={isFirstRender}
            />
        ));

    const getListOfLocations = useMemo(() => {
        const pointsOfInterestWithIndex = pointsOfInterest
            .map((point, index) => ({
                ...point,
                index
            }))

        if (!sortQuery && !searchQuery) {
            return mapPointsToComponents(pointsOfInterestWithIndex);
        }

        if (!!sortQuery && sortQueries.hasOwnProperty(sortQuery)) {
            const sortedPoints = pointsOfInterestWithIndex
                .sort(sortQueries[sortQuery]);

            return mapPointsToComponents(sortedPoints);
        }

        const filteredPoints = pointsOfInterestWithIndex.filter(point => 
                point.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))

        return mapPointsToComponents(filteredPoints);
    }, [pointsOfInterest, sortQuery, searchQuery]);

    return (
        <>
            <FilterSortBar
                handleSetSortQuery={handleSetSortQuery}
                handleSearchChange={handleSearchChange}
            />

            <hr></hr>

            <div className={styles['list-view-containter']}>
                {/* Renders list view */}
                {getListOfLocations}
            </div>
        </>
    )
}
