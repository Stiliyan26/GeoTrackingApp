import type { ReactNode, MouseEvent, MutableRefObject, SetStateAction, ChangeEvent } from 'react';

import { FormikProps } from 'formik';

export interface PointOfInterest {
    id: string,
    position: [number, number],
    name: string,
    description: string,
    category: string,
    imageUrl: string
}

export interface PointOfInterestWithIndex extends PointOfInterest{
    index: number
}

export interface CreatePointFormProps {
    onCreate: (formData: FormInputData) => void,
    onClose: (e: MouseEvent) => void
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

export type PointsLocalStorage = {
    [username: string]: PointOfInterest[]
}

export interface PointContextType {
    points: PointsLocalStorage,
    addPointByUser: (newPoint: PointOfInterest, username: string) => void,
    getPointsByUser: (username: string) => PointOfInterest[]
    deletePointById: (id: string, username: string) => void;
}

export interface PointProviderProps {
    children: ReactNode
}

export type AddPointByUserFunction = (
    newPoint: PointOfInterest,
    username: string
) => void;

export interface PointOfInterestProps {
    point: PointOfInterest,
    isUserLocation: boolean,
}

export interface ListLocationProps {
    index: number
    point: PointOfInterest,
    mapRef: MutableRefObject<L.Map | null>,
    isFirstRender: boolean,
    handleDelete: (id: string, username: string) => void
}

export interface ListViewProps {
    setIsFirstRender: React.Dispatch<SetStateAction<boolean>>,
    pointsOfInterest: PointOfInterest[],
    mapRef: MutableRefObject<L.Map | null>,
    isFirstRender: boolean,
    setPointsOfInterest: React.Dispatch<SetStateAction<PointOfInterest[]>>
}

export interface FilterSortBarProps {
    handleSetSortQuery: (name: string) => void; 
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    searchQuery: string
}

export type DeletePointFunction = (
    id: string,
    username: string
) => void;