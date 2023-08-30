import { PointOfInterest, PointsLocalStorage } from "../interfaces/pointInterfaces";

import { useState, useEffect } from "react";

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
                
                if (updatedPoints[username] === undefined) {
                    updatedPoints[username] = [];
                }

                updatedPoints[username].push(newPoint);

                return updatedPoints;
            });
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    const deletePoint = (id: string, username: string) => {
        try {
            setPoints(prev => {
                const filteredPoints = { ...prev };

                if (filteredPoints[username] !== undefined){
                    filteredPoints[username] = filteredPoints[username]
                        .filter(point => point.id !== id);
                }

                return filteredPoints;
            });
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    const getPoint = (id: string, username: string) => {
        return points[username]
            .find(point => point.id === id);
    }

    return [
        points,
        addPoint,
        deletePoint,
        getPoint
    ] as const;
}

export default usePointLocalStorage;