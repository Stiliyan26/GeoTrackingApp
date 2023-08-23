import { useState } from "react"

function useLocalStorage<T>(key: string, initialValue: T) {
    const [state, setState] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);

            return item
                ? JSON.parse(item)
                : initialValue;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }

            return initialValue;
        }
    })

    const setItem = (value: T) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));

            setState(value);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    return [
        state,
        setItem
    ] as const;
}

export default useLocalStorage;