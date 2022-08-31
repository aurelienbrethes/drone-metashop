import { useEffect, useState } from 'react';

const useLocalStorage = <T>(
    key: string,
    initialValue?: Array<T>,
): {
    value: Array<T>;
    addToLocalStorage: (item: T) => void;
    removeFromLocalStorage: (item: T) => void;
    emptyLocalStorage: () => void;
    setValue: (value: Array<T>) => void;
} => {
    const [value, setValue] = useState<Array<T>>(() => {
        const item =
            typeof window !== 'undefined'
                ? window.localStorage.getItem(key)
                : null;
        return item ? JSON.parse(item) : initialValue || [];
    });

    const checkEquality = (obj1: T, obj2: T) =>
        JSON.stringify(obj1) === JSON.stringify(obj2);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    const emptyLocalStorage = () => {
        setValue([]);
    };

    // TODO ADD MULTIPLE TYPE SUPPORT

    const addToLocalStorage = (item: T) => {
        if (typeof item === 'object') {
            const checkIfExists = (Item: T) =>
                value.find((i) => checkEquality(Item, i));

            if (!checkIfExists(item)) {
                setValue((c) => [...c, item]);
            }
        }
    };

    const removeFromLocalStorage = (item: T) => {
        setValue((c) => c.filter((i) => !checkEquality(item, i)));
    };

    return {
        value,
        addToLocalStorage,
        removeFromLocalStorage,
        emptyLocalStorage,
        setValue,
    };
};

export default useLocalStorage;
