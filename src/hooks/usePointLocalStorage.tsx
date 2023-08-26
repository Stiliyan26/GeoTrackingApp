import { useState, useEffect } from "react";
import { PointOfInterest, PointsLocalStorage } from "../interfaces/pointInterfaces";

function usePointLocalStorage(key: string, initialValue: PointsLocalStorage) {
    const [points, setPoints] = useState<PointsLocalStorage>(() => {
        try {
            const item = localStorage.getItem(key);

            return item
                ? JSON.parse(item)
                : initialValue;
        } catch (error) {
            console.error((error as Error).message);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(points));
        } catch (error) {
            console.error((error as Error).message);
        }
    }, [key, points]);

    const addPoint = (newPoint: PointOfInterest, username: string) => {
        try {
            setPoints(prev => {
                const updatedPoints = { ...prev };
                
                if (updatedPoints[username]?.length === undefined) {
                    updatedPoints[username] = [];
                }

                updatedPoints[username].push(newPoint);

                return updatedPoints;
            });
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    return [
        points,
        addPoint
    ] as const;
}

export default usePointLocalStorage;