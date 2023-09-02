import { createContext, useContext, useRef, useState } from "react";
import { MapContextType, MapProviderProps, PointOfInterest } from "../interfaces/pointInterfaces";


const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<MapProviderProps> = ({
    children
}) => {
    const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>([]);
    const [isFirstRender, setIsFirstRender] = useState<boolean>(false);
    const mapRef = useRef<L.Map | null>(null);

    const contextValues: MapContextType = {
        mapRef,
        pointsOfInterest,
        setPointsOfInterest,
        isFirstRender,
        setIsFirstRender
    };

    return (
        <MapContext.Provider value={contextValues}>
            {children}
        </MapContext.Provider>
    )
}

export const useMapContext = (): MapContextType => {
    const context = useContext(MapContext);

    if (context === undefined) {
        throw new Error('useMapContext must be used within a MapProvider')
    }

    return context;
}