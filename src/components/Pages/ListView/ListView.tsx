import styles from './ListView.module.css';

import FilterSortBar from "./FilterSortBar/FilterSortBar";
import ListLocation from './ListLocation/ListLocation';

import { usePointContext } from '../../../contexts/PointContext';
import { ListViewProps, PointOfInterestWithIndex } from '../../../interfaces/pointInterfaces';

import { ChangeEvent, useMemo, useState } from 'react';

interface SortQueries {
    [key: string]: (
        a: PointOfInterestWithIndex,
        b: PointOfInterestWithIndex) => number;
}

export default function ListView({
    setIsFirstRender,
    pointsOfInterest,
    mapRef,
    isFirstRender,
    setPointsOfInterest
}: ListViewProps) {
    const { deletePointById } = usePointContext();

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

    function handleDelete(id: string, username: string) {
        setIsFirstRender(false);
        setPointsOfInterest(prev => {
            let filteredPoints = prev;

            filteredPoints = filteredPoints
                .filter(point => point.id !== id)

            return filteredPoints;
        })
        deletePointById(id, username);
    }

    const mapPointsToComponents = (points: PointOfInterestWithIndex[]) => 
        points.map((point, index) => (
            <ListLocation key={point.id}
                index={index}
                point={point}
                mapRef={mapRef}
                isFirstRender={isFirstRender}
                handleDelete={handleDelete}
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
                searchQuery={searchQuery}
            />

            <hr></hr>

            <div className={styles['list-view-containter']}>
                {/* Renders list view */}
                {getListOfLocations}
            </div>
        </>
    )
}
