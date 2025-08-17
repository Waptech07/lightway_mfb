import { useEffect, useState } from 'react';
const useDebounce = (value: string): string => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, 500); // Adjust the delay as needed

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
}
export default useDebounce;