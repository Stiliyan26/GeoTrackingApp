import { createContext, useContext } from "react";
import { 
    PointContextType,
    PointProviderProps,
    AddPointByUserFunction, 
    DeletePointFunction,
    PointOfInterest,
    GetPointFunction
} from "../interfaces/pointInterfaces";

import usePointLocalStorage from "../hooks/usePointLocalStorage";

const PointContext = createContext<PointContextType | undefined>(undefined);

const initialValue = {};

export const PointProvider: React.FC<PointProviderProps> = ({
    children
}) => {
    const [points, addPoint, deletePoint, getPoint] = usePointLocalStorage('points', initialValue);

    const addPointByUser: AddPointByUserFunction
        = (newPoint, username) => addPoint(newPoint, username);

    const getPointsByUser
        = (username: string) => 
            !!points[username] 
                ? points[username]
                : [];

    const deletePointById: DeletePointFunction
        = (id: string, username: string) => deletePoint(id, username);

    const getPointById: GetPointFunction
        = (id: string, username: string) => getPoint(id, username);

    const contextValue = {
        points,
        addPointByUser,
        getPointsByUser,
        deletePointById,
        getPointById
    }

    return (
        <PointContext.Provider value={contextValue}>
            {children}
        </PointContext.Provider>
    )
}

export const usePointContext = () => {
    const pointState = useContext(PointContext);

    if (!pointState) {
        throw new Error("usePointContext must be used within an PointProvider");
    }

    return pointState;
}
