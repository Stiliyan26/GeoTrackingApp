import { createContext, useContext } from "react";
import { 
    PointContextType,
    PointProviderProps,
    AddPointByUserFunction, 
    DeletePointFunction,
    EditPointFunction,
    FormInputData
} from "../interfaces/pointInterfaces";

import usePointLocalStorage from "../hooks/usePointLocalStorage";

const PointContext = createContext<PointContextType | undefined>(undefined);

const initialValue = {};

export const PointProvider: React.FC<PointProviderProps> = ({
    children
}) => {
    const [points, addPoint, deletePoint, editPoint] = usePointLocalStorage('points', initialValue);

    const addPointByUser: AddPointByUserFunction
        = (newPoint, username) => addPoint(newPoint, username);

    const getPointsByUser
        = (username: string) => 
            !!points[username] 
                ? points[username]
                : [];

    const deletePointById: DeletePointFunction
        = (id: string, username: string) => deletePoint(id, username);

    const editPointById: EditPointFunction
        = (pointInfo: FormInputData, pointId: string, username: string) =>
             editPoint(pointInfo, pointId, username);

    const contextValue = {
        points,
        addPointByUser,
        getPointsByUser,
        deletePointById,
        editPointById
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
