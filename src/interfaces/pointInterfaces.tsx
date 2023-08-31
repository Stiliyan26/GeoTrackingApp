import type { ReactNode, MutableRefObject, SetStateAction, ChangeEvent, Dispatch } from 'react';

import { FormikProps } from 'formik';
import React from 'react';

//enums

export enum Action {
    Delete = 'delete',
    Edit = 'edit'
}

//types 
export type PointsLocalStorage = {
    [username: string]: PointOfInterest[]
}

export type AddPointByUserFunction = (
    newPoint: PointOfInterest,
    username: string
) => void;

export type DeletePointFunction = (
    id: string,
    username: string
) => void;

export type EditPointFunction = (
    pointInfo: FormInputData,
    pointId: string,
    username: string
) => void;

//interfaces

export type HandleShowDialogFunction = (
    action: Action,
    point: PointOfInterest,
    e: React.MouseEvent<HTMLButtonElement>
) => void;

export interface PointOfInterest extends FormInputData {
    id?: string,
    position: [number, number],
}

export interface PointOfInterestWithIndex extends PointOfInterest {
    index: number
}

export interface SourceFormProps {
    onSubmit: (formData: FormInputData) => void,
    onClose: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void,
    pointInfo?: FormInputData | undefined
}

export interface FormProps extends SourceFormProps {
    sourcePage?: string,
}

export interface FormInputProps {
    formik: FormikProps<FormInputData>
}

export interface FormInputInfo {
    id: string,
    label: string,
    htmlType: string,
    name: string,
    value: string,
    placeholder: string,
}

export interface FormInputData {
    name: string,
    category: string,
    description: string,
    imageUrl: string
}

export interface Coordinates {
    latitude: number,
    longitude: number
}


export interface PointContextType {
    points: PointsLocalStorage,
    addPointByUser: (newPoint: PointOfInterest, username: string) => void,
    getPointsByUser: (username: string) => PointOfInterest[]
    deletePointById: (id: string, username: string) => void;
    editPointById: (pointInfo: FormInputData, pointId: string, username: string) => void
}

export interface PointProviderProps {
    children: ReactNode
}

export interface PointOfInterestProps {
    point: PointOfInterest,
    isUserLocation: boolean,
}

export interface ListLocationProps {
    index: number
    point: PointOfInterest,
    mapRef: MutableRefObject<L.Map | null>,
    isFirstRender: boolean,
    handleShowDialog: (
        action: Action,
        point: PointOfInterest,
        e: React.MouseEvent<HTMLButtonElement>) => void,
}

export interface ListViewProps {
    setIsFirstRender: Dispatch<SetStateAction<boolean>>,
    pointsOfInterest: PointOfInterest[],
    mapRef: MutableRefObject<L.Map | null>,
    isFirstRender: boolean,
    setPointsOfInterest: Dispatch<SetStateAction<PointOfInterest[]>>
}

export interface FilterSortBarProps {
    handleSetSortQuery: (name: string) => void;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    searchQuery: string,
    mapRef: MutableRefObject<L.Map | null>
}

export interface DeleteDialogProps {
    point: PointOfInterest,
    handleDeletePoint: (id: string, username: string, e: React.MouseEvent<HTMLButtonElement>) => void,
    handleCloseDialog: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

export interface SortQueries {
    [key: string]: (
        a: PointOfInterestWithIndex,
        b: PointOfInterestWithIndex) => number;
}

export interface SortOptions {
	name: string,
	label: string
}
