import styles from './ListView.module.css';

import FilterSortBar from "./FilterSortBar/FilterSortBar";
import EditPoint from '../../Forms/EditPoint/EditPoint';
import DeleteDialog from '../DeleteDialog/DeleteDialog';

import { usePointContext } from '../../../contexts/PointContext';
import { useAuthContext } from '../../../contexts/AuthContext';
import {
    Action,
    FormInputData,
    ListViewProps,
    PointOfInterest,
} from '../../../interfaces/pointInterfaces';
import * as mapService from '../../../services/mapService';

import { ChangeEvent, useMemo, useState } from 'react';

export default function ListView({
    setIsFirstRender,
    pointsOfInterest,
    mapRef,
    isFirstRender,
    setPointsOfInterest
}: ListViewProps) {
    const { deletePointById, editPointById } = usePointContext();
    const { username } = useAuthContext();

    const [sortQuery, setSortQuery] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [currentPoint, setCurrentPoint] = useState<PointOfInterest | undefined>(undefined);

    //Sets sort query and resets search query
    const handleSetSortQuery = (name: string) => {
        setSortQuery(name);
        setSearchQuery('');
        setIsFirstRender(false);
    }
    //Sets search query and resets sort query
    function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchQuery(e.target.value);
        setSortQuery('');
        setIsFirstRender(false);
    }
    //Shows the dialog based on the action
    function handleShowDialog(
        action: Action,
        point: PointOfInterest,
        e: React.MouseEvent<HTMLButtonElement>
    ): void {
        e.preventDefault();

        if (action === Action.Delete) {
            setShowDeleteDialog(true);
        } else if (action === Action.Edit) {
            setShowEditForm(true);
        }

        setCurrentPoint(point);
        setIsFirstRender(false);
    }
    //Closes the dialog depending on wich one is open
    function handleCloseDialog(e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) {
        if (showDeleteDialog) {
            setShowDeleteDialog(false);
        }

        if (showEditForm && e.target === e.currentTarget) {
            setShowEditForm(false);
        }

        setIsFirstRender(false);
    }
    //Updates pointsOfInterest state and localStorage points
    function handleDeletePoint(id: string, username: string, e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        mapService
            .handleDeletePoint(
                setPointsOfInterest,
                deletePointById,
                id,
                username
            );
    }
    //Sets showEditForm, pointsOfInterest state and localStorage points
    function handleEditFormSubmit(formData: FormInputData) {
        if (currentPoint !== undefined && currentPoint.id !== undefined) {
            mapService
                .handleEditFormSubmit(
                    setShowEditForm,
                    setPointsOfInterest,
                    editPointById,
                    currentPoint.id,
                    username,
                    formData
                )
        }
    }

    //Retrives pointsOfInterest based on the search and sort query
    const getListOfLocations = useMemo(() => {
        return mapService
            .getListLocations(
                pointsOfInterest,
                sortQuery,
                searchQuery,
                mapRef,
                isFirstRender,
                handleShowDialog
            );
    }, [pointsOfInterest, sortQuery, searchQuery]);

    return (
        <>
            <FilterSortBar
                handleSetSortQuery={handleSetSortQuery}
                handleSearchChange={handleSearchChange}
                searchQuery={searchQuery}
                mapRef={mapRef}
            />

            <hr></hr>

            <div className={styles['list-view-containter']}>
                {/* Renders list view */}
                {getListOfLocations}
            </div>

            {showEditForm && !!currentPoint &&
                <EditPoint
                    onSubmit={handleEditFormSubmit}
                    onClose={handleCloseDialog}
                    pointInfo={currentPoint}
                />}

            {showDeleteDialog && !!currentPoint &&
                <DeleteDialog
                    point={currentPoint}
                    handleDeletePoint={handleDeletePoint}
                    handleCloseDialog={handleCloseDialog}
                />}
        </>
    )
}
