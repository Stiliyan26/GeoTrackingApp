import type { ChangeEvent, MouseEvent } from 'react';

import { FormikProps } from 'formik';

export interface PointOfInterest {
    position: [number, number],
    name: string,
    description: string,
    category: string
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
    description: string
}

export interface Coordinates {
    latitude: number,
    longitude: number
}