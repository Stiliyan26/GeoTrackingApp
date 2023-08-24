export interface PointOfInterest {
    position: [number, number],
    name: string,
    description: string,
    category: string
}

export interface PointOfInterestFormProps {
    onSubmit: (formData: PointOfInterest) => void
}