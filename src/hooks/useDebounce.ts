import { useState, useEffect } from 'react';

function useDebounce() {
    const [debouncedValue, setDebouncedValue] = useState('');
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(debouncedValue);
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [debouncedValue]);
}

export default useDebounce